import { Paper, Typography, Box, Chip, DialogContent, DialogActions, Dialog, styled, Button } from "@mui/material"
import { CalendarSVG } from "../Icons/Calendar"
import { ClockSVG } from "../Icons/Clock"
import { DeleteSVG } from "../Icons/Delete"
import { DotsVerticalSVG } from "../Icons/DotsVerticalSVG"
import { EditSVG } from "../Icons/Edit"
import { useState, useRef, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { TrashSVG } from "../Icons/Trash"
import { TaskContext } from "../../context/context"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const useClickOutside = (containerRef, callback) => {
    const callbackRef = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                callbackRef.current();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [containerRef]);
}

export const Card = ({ task }) => {
    const tasks = useContext(TaskContext);

    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [openOptions, setOpenOptions] = useState(false);
    const [open, setOpen] = useState(false);


    const deleteTask = (e: MouseEvent) => {
        const taskId = parseInt((e.target as HTMLElement).id);
        const updatedTask = tasks.filter(item => item.id !== taskId);
        sessionStorage.setItem("tasks", JSON.stringify(updatedTask));
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const onEdit = (e: MouseEvent) => {
        navigate(`/edit/${(e.target as HTMLElement).id}`, { replace: true });
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenOptions = () => {
        setOpenOptions(true)
    }
    const handleCloseOptions = () => {
        setOpenOptions(false)
    }
    useClickOutside(containerRef, handleCloseOptions);
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
                        <Chip label="status"
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
                    ><ClockSVG /> Created:{task.time}</Typography>
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
                onClose={handleClose}
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
                        <Button
                            onClick={handleClose}
                            sx={{
                                width: '170px',
                                maeginRight: '6px',
                                textTransform: 'none',
                                color: 'primary.main',
                                borderRadius: '50px',
                                border: '1px solid #D7D9DC',
                            }}
                        >Cancel</Button>
                        <Button
                            id={task.id}
                            sx={{
                                width: '170px',
                                marginLeft: '6px',
                                textTransform: 'none',
                                backgroundColor: 'error.dark',
                                color: 'background.paper',
                                borderRadius: '50px',
                                border: '1px solid #D7D9DC',
                            }}
                            onClick={deleteTask}
                        >Delete</Button>
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
                                id={task.id}
                                sx={{
                                    paddingBottom: '10px',
                                    cursor: 'pointer'
                                }}
                                onClick={onEdit}
                            >
                                <EditSVG /> Edit task
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'error.dark',
                                    cursor: 'pointer'
                                }}
                                onClick={handleClickOpen}
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