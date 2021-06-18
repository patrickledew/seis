import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiButton: {
      label: {
        color: "#f1f1f1",
      },
    },
  },
});
export default Theme;
