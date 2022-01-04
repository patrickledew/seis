import { createTheme } from "@material-ui/core/styles";
import { deepPurple, grey, yellow } from "@material-ui/core/colors";

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: yellow,
    background: grey,
  },
  typography: {
    allVariants: {
      fontFamily: "Patrick Hand, Segoe UI, sans-serif",
      textTransform: "none"
    },
    body1: {
      fontFamily: "Segoe UI, sans-serif"
    }
  },
});
export default Theme;
