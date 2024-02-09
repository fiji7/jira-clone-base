import styled from "@emotion/styled";
import { Dialog, Button, Box, Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface StyledDialogProps {
  theme: Theme;
}

export const BootstrapDialog = styled(Dialog)<StyledDialogProps>(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface StyledButtonProps {
  theme: Theme;
}

export const CancelButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  width: '170px',
  marginRight: '6px',
  textTransform: 'none',
  color: theme.palette.primary.main,
  borderRadius: '50px',
  border: `1px solid ${theme.palette.grey['300']}`,
  '@media (max-width: 441px)': {
    marginBottom: '20px'
  },
}));

export const DeleteButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  width: '170px',
  marginLeft: '6px',
  textTransform: 'none',
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.background.paper,
  borderRadius: '50px',
  border: `1px solid ${theme.palette.grey['300']}`,
}));

export const MainBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '16px'
});

export const OptionsPaper = styled(Paper)({
  width: '200px',
  position: 'absolute',
  top: '-50px',
  right: 0
});

export const DateTypography = styled(Typography)<StyledButtonProps>(({ theme }) => ({
  paddingLeft: '40px',
  paddingBottom: '20px',
  fontSize: '12px',
  color: theme.palette.grey['600']
}));
