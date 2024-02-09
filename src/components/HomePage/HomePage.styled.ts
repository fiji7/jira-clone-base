import { Box, Button, styled } from "@mui/material";

export const SkeletonBox = styled(Box)({
    width: "max-content",
    margin: "0 auto",
    padding: "20px 0",
    textAlign: "center"
});

export const AddButton = styled(Button)({
    float: "right",
    borderRadius: "50px",
    marginTop: "20px",
    textTransform: "none"
});
