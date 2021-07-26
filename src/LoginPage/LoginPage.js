import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./loginPage.scss";

const LoginPage = () => {
  return (
    <Grid container className="LoginPage fullWidth fullHeight centerVertically centerHorizontally backgroundGradient">
      <Grid item xs={10} sm={6} md={5} lg={5} xl={3}>
        <Paper elevation={12}>
          <Box p="35px">
            <Grid item lg={12}>
              <Box mb="35px">
                <Typography variant="h4" align="center">
                  Login
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box p="10px">
                <TextField
                  id="email-input"
                  label="Email"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  autoFocus
                />
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box p="10px">
                <TextField
                  type="password"
                  id="pwd-input"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
                </Box>
              </Grid>
              
  
            <Grid item lg={12} className="centerHorizontally">
              <Box p="10px">
                <Button size="medium" variant="contained" color="primary">
                  Login
                </Button>
              </Box>
            </Grid>
            </Box>
          </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
