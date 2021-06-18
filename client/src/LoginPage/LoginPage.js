import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./loginPage.scss";

const LoginPage = () => {
  return (
    <Paper className="LoginPage fullWidth fullHeight centerVertically centerHorizontally">
      <Grid item lg={3}>
        <Paper>xs=3</Paper>
      </Grid>
    </Paper>
  );
};

export default LoginPage;
