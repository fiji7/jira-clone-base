import { useEffect, useState } from "react";
import { Box, Container, Stack, Breadcrumbs, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AddSVG } from "../Icons/Add";
import { FileSVG } from "../Icons/File";
import { NoTaskSVG } from "../Icons/NoTask";
import { ChevronRightSVG } from "../Icons/ChevronRight";
import { Card } from "../Card/Card";
import { TaskContext } from "../../context/context";


export enum TaskStatus {
    TO_DO = 'ToDo',
    IN_PROGRESS = 'InProgress',
    BLOCKED = 'Blocked',
    IN_QA = 'InQa',
    DONE = 'Done',
    DEPLOYED = 'Deployed'
}

export interface Task {
    id: number;
    status: TaskStatus;
    title: string;
    description: string;
    created: string;
}



export default function HomePage() {

    const [tasks, setTasks] = useState([]);
    const [field, setField] = useState({
        title: "",
        description: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setField({
            ...field,
            [name]: value
        });
    };


    useEffect(() => {
        const storedTasks = JSON.parse(sessionStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, [tasks]);

    const handleAddTask = () => {
        if (!field.title || !field.description) {
            alert("Title and Description are required!");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: field.title,
            description: field.description
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        // Save tasks to session storage
        sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));

        // Clear input fields
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
        <TaskContext.Provider value={tasks}>
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
                            <Button
                                onClick={handleAddTask}
                                sx={{
                                    float: "right",
                                    borderRadius: "50px",
                                    marginTop: "20px",
                                    textTransform: "none"
                                }}
                                variant="contained"
                            >
                                <AddSVG />
                                Add
                            </Button>
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
                            <Box
                                sx={{
                                    width: "max-content",
                                    margin: "0 auto",
                                    padding: "20px 0",
                                    textAlign: "center"
                                }}
                            >

                                <>
                                    <NoTaskSVG />
                                    <Typography>
                                        You have nothing to do.
                                        <br />
                                        Go get some sleep!
                                    </Typography>
                                </>

                            </Box>
                        </Paper>
                    ) : (
                        tasks.map((task) => (
                            <Card key={task.id} task={task}
                            />
                        ))
                    )}
                </Container>
            </Box>
        </TaskContext.Provider >
    );
}
