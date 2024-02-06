import { Box, Container, Stack, Breadcrumbs, Paper, Typography, TextField, Button, Link, ThemeProvider, FormControl, MenuItem, Select, OutlinedInput } from "@mui/material"
import { ChevronRightSVG } from "../Icons/ChevronRight"
import { CheckMarkSVG } from "../Icons/CheckMark"
import { EditSVG } from "../Icons/Edit"
import { theme } from '../../theme';

export default function EditPage() {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Task Management
        </Link>,
        <Typography key="3" color="text.primary">
            Edit
        </Typography>,
    ];

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
                            {breadcrumbs}
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
                            <TextField id="outlined-basic" label="Title of the task" variant="outlined"
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        borderRadius: '50px',
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ padding: '0 20px' }}>
                            <TextField id="outlined-basic" label="Description of the task goes here." variant="outlined" multiline rows={20}
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
                                value={20}
                                label="Age"
                            >
                                <MenuItem value={20}>InProgress</MenuItem>
                                <MenuItem value={30}>Done</MenuItem>
                                <MenuItem value={10}>Todo</MenuItem>
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
                                variant="contained">
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
                                variant="contained">
                                Cancel
                            </Button>
                        </Box>

                    </Paper>

                </Container>
            </Box>
        </ThemeProvider>
    )
}