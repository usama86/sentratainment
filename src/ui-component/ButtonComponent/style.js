import Button from "@mui/material/Button";
import BoxComponent from "../BoxComponent";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)(({ theme, borderRadius }) => ({
  borderRadius: borderRadius,
  height: "48px",
  borderColor: theme.palette.common.black,
  boxShadow: "none",
  ":hover": {
    boxShadow: "none",
  },
}));

export const TransButtons = styled(Button)(({ theme, buy }) => ({
  display: "flex",
  color: theme.palette.common.black,
  justifyContent: "center",
  alignItems: "center",
  padding: "16px auto",
  width: "183px",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.06)",
  position: "relative",
  height: "56px",
  ":after": {
    padding: 0,
    margin: 0,
    display: "block",
    content: "''",
    width: buy ? "1px" : "0px",
    height: "50%",
    backgroundColor: "black",
    position: "absolute",
    right: "-1px",
    top: "10px",
    left: "-1px",
  },
  ":before": {
    padding: 0,
    margin: 0,
    display: "block",
    content: "''",
    width: buy ? "1px" : "0px",
    height: "50%",
    backgroundColor: "black",
    position: "absolute",
    top: "10px",
    right: "-1px",
  },
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.06)",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    lineHeight: "21px",
  },
}));

export const LoaderWrapper = styled(BoxComponent)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
