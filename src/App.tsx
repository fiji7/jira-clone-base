import { Box, Button, ThemeProvider, Typography, Container, Paper, TextField, Stack, Breadcrumbs, Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { theme } from './theme'
import { NoTaskSVG } from './components/Icons/NoTask';
import { AddSVG } from './components/Icons/Add';
import { FileSVG } from './components/Icons/File';

export default function App() {


  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Task Management
    </Link>,
    <Typography key="3" color="text.primary">
      Home
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
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <Paper elevation={3} sx={{ bgcolor: '#fff' }}>
            <Box sx={{ padding: '20px' }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '0 0 20px 20px'
                }}><FileSVG /> Add new task</Typography>
              <TextField id="outlined-basic" label="Title" variant="outlined"
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderRadius: '50px',
                  },
                }}
              />
            </Box>
            <Box sx={{ padding: '0 20px' }}>
              <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderRadius: '20px',
                  },
                }}
              />
            </Box>
            <Box sx={{ padding: '0 20px', height: '80px' }}>
              <Button
                sx={{
                  float: 'right',
                  borderRadius: '50px',
                  marginTop: '20px',
                  textTransform: 'none'
                }}
                variant="contained">
                <AddSVG />Add</Button>
            </Box>

          </Paper>
          <Typography
            sx={{
              padding: '40px 0 20px',
              fontSize: '24px',
              fontWeight: '600'
            }}
          >Tasks</Typography>
          <Paper elevation={3} >
            <Box
              sx={{
                width: 'max-content',
                margin: '0 auto',
                padding: '20px 0',
                '&': {
                  textAlign: 'center'
                },
              }}
            >
              <NoTaskSVG />
              <Typography>
                You have nothing to do.
                <br />
                Go get some sleep!
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
