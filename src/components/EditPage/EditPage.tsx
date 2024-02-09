import { useEffect, useState } from "react";
import { Box, Container, Stack, Breadcrumbs, Paper, Typography, TextField, Button, Link, ThemeProvider, FormControl, MenuItem, Select, OutlinedInput, SelectChangeEvent } from "@mui/material"
import { ChevronRightSVG } from "../Icons/ChevronRight"
import { CheckMarkSVG } from "../Icons/CheckMark"
import { EditSVG } from "../Icons/Edit"
import { theme } from '../../theme';
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatus } from "../../utils/enums/TaskEnum";
import { getPossibleSelectOptions } from "../../utils/getPossibleSelectOptions";
import { Task } from "../../utils/interfaces/Task";

export default function EditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task | null>(null);
    const [selectValue, setSelectValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value);
    };

    const handleSaveChanges = () => {
        if (!task) return;

        const updatedTask = { ...task };

        let hasChanges = false;

        if (titleValue !== task.title) {
            updatedTask.title = titleValue;
            hasChanges = true;
        }

        if (descriptionValue !== task.description) {
            updatedTask.description = descriptionValue;
            hasChanges = true;
        }

        if (selectValue !== task.status) {
            updatedTask.status = selectValue as TaskStatus;
            hasChanges = true;
        }

        if (!hasChanges) {
            alert("Title and Description are required!");
        }

        const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
        setTasks(updatedTasks);

        sessionStorage.setItem('tasks', JSON.stringify(updatedTasks));


        navigate(`/`, { replace: true });
    };

    useEffect(() => {
        const storedTasksString = sessionStorage.getItem("tasks");

        if (storedTasksString) {
            const storedTasks = JSON.parse(storedTasksString) as Task[];
            setTasks(storedTasks);
            const chosenTask = storedTasks.find(item => item.id === Number(id));
            if (chosenTask) {
                setTask(chosenTask);
                setTitleValue(chosenTask.title);
                setDescriptionValue(chosenTask.description);
            }
        }

    }, [id])

    useEffect(() => {
        if (task?.status) {
            setSelectValue(task.status)
        }

    }, [task])


    return (
        <ThemeProvider theme={theme}>
            <Box >
                <Container maxWidth="sm">
                    <Stack spacing={2}
                        sx={{
                            padding: '20px 0'
                        }}
                    >
                        <Breadcrumbs
                            separator={<ChevronRightSVG />}
                            aria-label="breadcrumb"
                        >
                            <Link underline="hover" key="1" color="inherit" href="/">
                                Task Management
                            </Link>,
                            <Typography key="3" color="text.primary">
                                Edit
                            </Typography>,
                        </Breadcrumbs>
                    </Stack>
                    <Paper elevation={3} >
                        <Box sx={{ padding: '20px' }}>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    padding: '0 0 20px 20px'
                                }}><EditSVG /> Edit task</Typography>
                            <TextField id="title-input" label="Title of the task" variant="outlined" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        borderRadius: '50px',
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ padding: '0 20px' }}>
                            <TextField id="description-input" label="Description of the task goes here." variant="outlined" multiline rows={20} value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        borderRadius: '20px',
                                    },
                                }}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <Select
                                input={<OutlinedInput />}
                                sx={{
                                    width: '94%',
                                    margin: '20px auto',
                                    borderRadius: '50px'
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValue}
                                onChange={handleSelectChange}
                                label="Status"
                            >
                                {task && getPossibleSelectOptions(task.status).map((el, index) => (
                                    <MenuItem key={`${el}_${index}`} value={el}>{el}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ padding: '0 20px', height: '120px', textAlign: 'center' }}>
                            <Button
                                sx={{
                                    width: '220px',
                                    margin: '0 10px',
                                    borderRadius: '50px',
                                    marginTop: '20px',
                                    textTransform: 'none'
                                }}
                                variant="contained"
                                onClick={handleSaveChanges}
                            >
                                <CheckMarkSVG />Save changes
                            </Button>
                            <Button
                                sx={{
                                    width: '220px',
                                    margin: '0 10px',
                                    borderRadius: '50px',
                                    marginTop: '20px',
                                    textTransform: 'none',
                                    backgroundColor: 'background.paper',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'background.paper',
                                    }
                                }}
                                variant="contained"
                                onClick={() => navigate(`/`, { replace: true })}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
