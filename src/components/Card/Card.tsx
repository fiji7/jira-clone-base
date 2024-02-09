import { Paper, Typography, Box, Chip, DialogContent, DialogActions, Dialog, styled, Button } from "@mui/material"
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

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
    width: '170px',
    maeginRight: '6px',
    textTransform: 'none',
    color: theme.palette.primary.main,
    borderRadius: '50px',
    border: `1px solid ${theme.palette.grey['300']}`,
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
    width: '170px',
    marginLeft: '6px',
    textTransform: 'none',
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.background.paper,
    borderRadius: '50px',
    border: `1px solid ${theme.palette.grey['300']}`,
}));

interface CardProps {
    task: Task;
}


export const Card = ({ task }: CardProps) => {
    const navigate = useNavigate();
    const { tasks, setTasks }  = useTaskContext();
    const containerRef = useRef(null);
    const [openOptions, setOpenOptions] = useState(false);
    const [open, setOpen] = useState(false);


    const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const taskId = parseInt((e.target as HTMLElement).id);
        const updatedTask = tasks.filter((item: Task) => item.id !== taskId);

        sessionStorage.setItem("tasks", JSON.stringify(updatedTask));
        setTasks(updatedTask)
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const redirectToEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/edit/${(e.target as HTMLElement).id}`, { replace: true });
    };

    const handleCloseDialog = () => {
        setOpen(false);
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '16px'
                    }}
                >
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
                                marginRight: '10px'
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
                </Box>
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
                        }}
                    >{task.description}</Typography>
                </Box>
            </Paper>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
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
                        <CancelButton onClick={handleCloseDialog}>Cancel</CancelButton>
                        <DeleteButton id={String(task.id)} onClick={handleDeleteTask}>Delete</DeleteButton>
                    </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
            {
                openOptions && (
                    <Box style={{ position: 'relative' }}>
                        <Paper elevation={3}
                            sx={{
                                width: '200px',
                                position: 'absolute',
                                top: '-50px',
                                right: 0
                            }}
                        >
                            <Typography
                                sx={{
                                    paddingBottom: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                <CalendarSVG /> Task history
                            </Typography>
                            <Typography
                                id={String(task.id)}
                                sx={{
                                    paddingBottom: '10px',
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
                                onClick={handleOpenDialog}
                            >
                                <DeleteSVG /> Delete task
                            </Typography>
                        </Paper>
                    </Box>
                )
            }
        </>
    )
}