import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        p: {
          "@font-face": {
            "font-family": "Segoe UI",
          },
        },
      },
    },
  },
});
export default Theme;
