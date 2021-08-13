import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
  },
  typography: {
      allVariants: {
          fontFamily: "Patrick Hand, Segoe UI"
      }
  }

});
export default Theme;
