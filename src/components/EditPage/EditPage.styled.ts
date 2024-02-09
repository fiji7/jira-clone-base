import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface StyledButtonProps extends ButtonProps {
  theme: Theme;
}

export const CancelButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  width: '220px',
  margin: '0 10px',
  borderRadius: '50px',
  marginTop: '20px',
  textTransform: 'none',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.background.paper
  }
}));

export const SaveButton = styled(Button)<StyledButtonProps>(({
  width: '220px',
  margin: '0 10px',
  borderRadius: '50px',
  marginTop: '20px',
  textTransform: 'none'
}));
