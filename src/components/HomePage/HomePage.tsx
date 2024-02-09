import { useEffect, useState } from "react";
import { Box, Container, Stack, Breadcrumbs, Paper, Typography, TextField, Link, Alert, Snackbar } from "@mui/material";
import { format } from 'date-fns';
import { AddSVG } from "../Icons/Add";
import { FileSVG } from "../Icons/File";
import { NoTaskSVG } from "../Icons/NoTask";
import { ChevronRightSVG } from "../Icons/ChevronRight";
import { Card } from "../Card/Card";
import { TaskContext } from "../../context/context";
import { TaskStatus } from "../../utils/enums/TaskEnum";
import { Task } from "../../utils/interfaces/Task";
import { AddButton, SkeletonBox } from "./HomePage.styled";


export default function HomePage() {
    const [openAlert, setOpenAlert] = useState(false);


    const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const [tasks, setTasks] = useState<Task[]>([])
    const [field, setField] = useState({
        title: "",
        description: ""
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setField({
            ...field,
            [name]: value
        });
    };

    useEffect(() => {
        const storedTasksString = localStorage.getItem("tasks");

        if (storedTasksString) {
            const storedTasks = JSON.parse(storedTasksString);
            setTasks(storedTasks);
        }

    }, []);

    const handleAddTask = () => {
        if (!field.title || !field.description) {
            setOpenAlert(true);
            return;
        }

        const newTask = {
            id: Date.now(),
            title: field.title,
            status: TaskStatus.TO_DO,
            created: format(Date.now(), "MMM d, yyyy - h:mm a"),
            description: field.description,
            history: [{ title: TaskStatus.TO_DO, created: format(Date.now(), "MMM d, yyyy - h:mm a") }]
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setField({
            title: "",
            description: ""
        });
    };

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Task Management
        </Link>,
        <Typography key="3" color="text.primary">
            Home
        </Typography>
    ];

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            <Box>
                <Container maxWidth="sm">
                    <Stack
                        spacing={2}
                        sx={{
                            padding: "20px 0"
                        }}
                    >
                        <Breadcrumbs separator={<ChevronRightSVG />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                    <Paper elevation={3}>
                        <Box sx={{ padding: "20px" }}>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    padding: "0 0 20px 20px"
                                }}
                            >
                                <FileSVG /> Add new task
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                name="title"
                                value={field.title}
                                onChange={handleInputChange}
                                label="Title"
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-root": {
                                        borderRadius: "50px"
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ padding: "0 20px" }}>
                            <TextField
                                id="outlined-basic"
                                name="description"
                                value={field.description}
                                onChange={handleInputChange}
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-root": {
                                        borderRadius: "20px"
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ padding: "0 20px", height: "80px" }}>
                            <AddButton
                                onClick={handleAddTask}
                                variant="contained"
                            >
                                <AddSVG />
                                Add
                            </AddButton>
                        </Box>
                    </Paper>
                    <Typography
                        sx={{
                            padding: "40px 0 20px",
                            fontSize: "24px",
                            fontWeight: "600"
                        }}
                    >
                        Tasks
                    </Typography>
                    {tasks.length === 0 ? (
                        <Paper elevation={3}>
                            <SkeletonBox
                            >

                                <>
                                    <NoTaskSVG />
                                    <Typography>
                                        You have nothing to do.
                                        <br />
                                        Go get some sleep!
                                    </Typography>
                                </>

                            </SkeletonBox>
                        </Paper>
                    ) : (
                        tasks.map((task: Task) => (
                            <Card key={task.id} task={task}
                            />
                        ))
                    )}
                </Container>
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert
                    onClose={handleCloseAlert}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please fill out the fields
                </Alert>
            </Snackbar>
        </TaskContext.Provider >
    );
}
