import { createTheme } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
  },
  typography: {
    allVariants: {
      fontFamily: "Patrick Hand, Segoe UI",
    },
  },
});
export default Theme;
