import { Paper, Typography, Box, Chip, DialogContent, DialogActions, Divider, useTheme } from "@mui/material"
import { CalendarSVG } from "../Icons/Calendar"
import { ClockSVG } from "../Icons/Clock"
import { DeleteSVG } from "../Icons/Delete"
import { DotsVerticalSVG } from "../Icons/DotsVerticalSVG"
import { EditSVG } from "../Icons/Edit"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { TrashSVG } from "../Icons/Trash"
import { useTaskContext } from "../../context/context"
import { useClickOutside } from "../../helperHooks/useClickOutside"
import { Task } from "../../utils/interfaces/Task"
import { getChipBackgroundColor } from "../../utils/getChipBackgroundColor"
import { BootstrapDialog, CancelButton, DateTypography, DeleteButton, MainBox, OptionsPaper } from "./Card.styled"


interface CardProps {
    task: Task;
}


export const Card = ({ task }: CardProps) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const { tasks, setTasks } = useTaskContext();
    const containerRef = useRef(null);
    const [openOptions, setOpenOptions] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openHistoryDialog, setOpenHistoryDialog] = useState(false);


    const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const taskId = parseInt((e.target as HTMLElement).id);
        const updatedTask = tasks.filter((item: Task) => item.id !== taskId);

        localStorage.setItem("tasks", JSON.stringify(updatedTask));
        setTasks(updatedTask)
        setOpenDeleteDialog(false);
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const redirectToEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/edit/${(e.target as HTMLElement).id}`, { replace: true });
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleCloseHistoryDialog = () => {
        setOpenHistoryDialog(false);
    };

    const handleOpeneHistoryDialog = () => {
        setOpenHistoryDialog(true);
    };

    const handleOpenOptions = () => {
        setOpenOptions(true)
    };

    const handleCloseDialogOptions = () => {
        setOpenOptions(false)
    };

    useClickOutside(containerRef, handleCloseDialogOptions);



    return (
        <>
            <Paper elevation={3}
                ref={containerRef}
                key={task.id}
                sx={{
                    marginTop: '20px'
                }}
            >
                <MainBox>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            padding: '0 20px'
                        }}
                    >{task.title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingRight: '10px'
                        }}
                    >
                        <Chip label={task.status}
                            sx={{
                                marginRight: '10px',
                                backgroundColor: getChipBackgroundColor(task.status).main,
                                color: getChipBackgroundColor(task.status).secondary
                            }}
                        />
                        <Box
                            sx={{
                                padding: '5px 10px',
                                cursor: 'pointer'
                            }}
                            onClick={handleOpenOptions}
                        >
                            <DotsVerticalSVG />
                        </Box>
                    </Box>
                </MainBox>
                <Box
                    sx={{
                        padding: '0 20px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'grey.600'
                        }}
                    ><ClockSVG /> Created:{task.created}</Typography>
                    <Typography
                        sx={{
                            paddingBottom: '16px',
                            fontSize: '14px',
                            color: 'grey.600'
                        }}>
                        {task.description.length > 50 ? `${task.description.slice(0, 50)}...` : task.description}
                    </Typography>
                </Box>
            </Paper>
            <BootstrapDialog
                onClose={handleCloseDeleteDialog}
                aria-labelledby="customized-dialog-title"
                open={openDeleteDialog} theme={theme}>
                <DialogContent
                    sx={{
                        textAlign: 'center',
                        font: 'CircularXX'
                    }}
                >
                    <Box sx={{
                        paddingTop: '40px'
                    }}>
                        <TrashSVG />
                        <Typography variant="h5"
                            sx={{
                                fontWeight: 800,
                                paddingTop: '40px'
                            }}
                        >Delete Task?</Typography>
                        <Typography
                            sx={{
                                paddingTop: '8px',
                                width: '80%',
                                margin: '0 auto'
                            }}
                        >You have made changes, are you sure about deleting “Task”?</Typography>
                    </Box>
                    <Box
                        sx={{
                            paddingTop: '40px'
                        }}
                    >
                        <CancelButton onClick={handleCloseDeleteDialog} theme={theme}>Cancel</CancelButton>
                        <DeleteButton id={String(task.id)} onClick={handleDeleteTask} theme={theme}>Delete</DeleteButton>
                    </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleCloseHistoryDialog}
                aria-labelledby="customized-dialog-title"
                open={openHistoryDialog} theme={theme}>
                <DialogContent
                    sx={{
                        height: '60vh',
                        width: '40vh',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                padding: '32px',
                                fontSize: '24px',
                                fontWeight: 600
                            }}
                        >Task history</Typography>
                        {task.history.map((el, index) => {
                            return (
                                <Box key={`history_${el.title}_${index}`}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            paddingTop: '20px',
                                            paddingLeft: '40px'
                                        }}
                                    >{`The task was marked as "${el.title}"`}
                                    </Typography>
                                    <DateTypography theme={theme}><ClockSVG /> {el.created}</DateTypography>
                                    <Divider />
                                </Box>
                            )
                        })}
                    </Box>

                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
            {
                openOptions && (
                    <Box style={{ position: 'relative' }}>
                        <OptionsPaper elevation={3}>
                            <Box
                                sx={{
                                    padding: '16px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        paddingBottom: '16px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleOpeneHistoryDialog}
                                >
                                    <CalendarSVG /> Task history
                                </Typography>
                                <Typography
                                    id={String(task.id)}
                                    sx={{
                                        paddingBottom: '16px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={redirectToEdit}
                                >
                                    <EditSVG /> Edit task
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'error.dark',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleOpenDeleteDialog}
                                >
                                    <DeleteSVG /> Delete task
                                </Typography>
                            </Box>
                        </OptionsPaper>
                    </Box>
                )
            }
        </>
    )
}