import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import "./loginPage.scss";

//TODO: Figure out how to over ride the input base focus color
const LoginPage = () => {
  return (
    <Paper className="LoginPage fullWidth fullHeight centerVertically centerHorizontally backgroundGradient">
      <Grid item xs={10} sm={6} md={4} lg={3} xl={2}>
        <Paper elevation={12} className="padding35">
          <Grid item lg={12} className="marginBottom10">
            <Typography variant="h4" align="center">
              Login
            </Typography>
          </Grid>
          <Grid item lg={12} className="padding10">
            <TextField
              type="email"
              id="email-input"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} className="padding10">
            <TextField
              type="password"
              id="pwd-input"
              label="Password"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} className="padding10 centerHorizontally">
            <Button size="large" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Paper>
  );
};

export default LoginPage;
