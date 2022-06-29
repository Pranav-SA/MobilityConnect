import React, { useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0DD2D9",
      },
      secondary: {
        main:"#414141",
      },
    },
  });

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#414141",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

/**
 * For user login
 * @param {props} props
 */
 function UserLoginComponent(props) {
     const classes = useStyles();
 
     const [username, setUsername] = React.useState("");
     const [password, setPassword] = React.useState("");
 
     const [loginError, setLoginError] = React.useState("");
 
     useEffect(() => {
         if (props.user.error) {
             setLoginError(props.user.error);
         } else {
             setLoginError("");
         }
     }, [props.user]);
 
     const onLogin = (e) => {
         e.preventDefault();
         props.onLogin(username, password);
     };
 
     const onChangeUsername = (e) => {
         setUsername(e.target.value);
         setLoginError("");
     };
 
     const onChangePassword = (e) => {
         setPassword(e.target.value);
         setLoginError("");
     };
 
    return (

        <div>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        fullWidth
                        label="E-mail"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={loginError !== ""}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        fullWidth
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={loginError !== ""}
                        type="password"
                    />
                     {loginError !== "" ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Remember me"
                    />
                    <div>
                        <Button
                            className={classes.loginButton}
                            onClick={props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            onClick={onLogin}
                            disabled={username === "" || password === ""}
                            type="submit"
                            color="secondary"
                        >
                            Login
                        </Button>
                    </div>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" color="secondary">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/register" color="secondary">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
             </Container>
             </ThemeProvider>
        </div>
    );

}

export default UserLoginComponent;