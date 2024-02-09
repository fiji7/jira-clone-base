import { useEffect, useState } from "react";
import { Box, Container, Stack, Breadcrumbs, Paper, Typography, TextField, Link, ThemeProvider, FormControl, MenuItem, Select, OutlinedInput, SelectChangeEvent, Snackbar, Alert } from "@mui/material"
import { format } from "date-fns";
import { ChevronRightSVG } from "../Icons/ChevronRight"
import { CheckMarkSVG } from "../Icons/CheckMark"
import { EditSVG } from "../Icons/Edit"
import { theme } from '../../theme';
import { useNavigate, useParams } from "react-router-dom";
import { TaskStatus } from "../../utils/enums/TaskEnum";
import { getPossibleSelectOptions } from "../../utils/getPossibleSelectOptions";
import { Task } from "../../utils/interfaces/Task";
import { SaveButton, CancelButton } from "./EditPage.styled";


export default function EditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task | null>(null);
    const [selectValue, setSelectValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [openAlert, setOpenAlert] = useState(false);


    const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

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

            const newHistory = [...task.history];
            if (newHistory.length === 3) {
                newHistory.shift();
            }
            newHistory.push({
                title: selectValue,
                created: format(Date.now(), "MMM d, yyyy - h:mm a"),
            });
            updatedTask.history = newHistory;
            updatedTask.status = selectValue as TaskStatus;
            hasChanges = true;
        }

        if (!hasChanges) {
            setOpenAlert(true)
            return;
        }

        const updatedTasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
        setTasks(updatedTasks);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));


        navigate(`/`, { replace: true });
    };

    useEffect(() => {
        const storedTasksString = localStorage.getItem("tasks");

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
                            {
                                task && getPossibleSelectOptions(task.status).length !== 0 && (
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
                                        {getPossibleSelectOptions(task.status).map((el, index) => (
                                            <MenuItem key={`${el}_${index}`} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                )
                            }

                        </FormControl>
                        <Box sx={{ padding: '0 20px', height: '120px', textAlign: 'center' }}>
                            <SaveButton
                                variant="contained"
                                onClick={handleSaveChanges} theme={theme}>
                                <CheckMarkSVG />Save changes
                            </SaveButton>
                            <CancelButton
                                variant="contained"
                                onClick={() => navigate(`/`, { replace: true })} theme={theme}>
                                Cancel
                            </CancelButton>
                        </Box>
                    </Paper>
                </Container>
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert
                    onClose={handleCloseAlert}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please provide a change at least in one field
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}
