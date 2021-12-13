import { createTheme } from "@material-ui/core/styles";
import { deepPurple, yellow } from "@material-ui/core/colors";

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: yellow
  },
  typography: {
    allVariants: {
      fontFamily: "Patrick Hand, Segoe UI",
      textTransform: "none"
    },
  },
});
export default Theme;
