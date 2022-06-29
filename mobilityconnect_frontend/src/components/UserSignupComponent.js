import React, { useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
 * For register new users
 * @param {props} props
 */
 function  UserSignupComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  //const [minutes, setMinutes] = React.useState(false);

  const [registerError, setRegisterError] = React.useState("");

  useEffect(() => {
    if (props.user.error) {
        setRegisterError(props.user.error);
    } else {
        setRegisterError("");
    }
}, [props.user]);



  const onRegister = (e) => {
      e.preventDefault();
      props.onRegister(username, birthday, password, isAdmin, [0,0,0,0,0,0,0]);
  };

  const onChangeUsername = (e) => {
      setUsername(e.target.value);
      setRegisterError("");
  };

  const onChangeBirthday = (e) => {
    setBirthday(e.target.value);
    setRegisterError("");
};

  const onChangePassword = (e) => {
      setPassword(e.target.value);
      setRegisterError("");
  };

  const onChangePassword2 = (e) => {
      setPassword2(e.target.value);
      setRegisterError("");
  };

  const onBlurPassword = (e) => {
      if (password !== "" && password2 !== "") {
          if (password !== password2) {
              setRegisterError("Passwords do not match.");
          } else {
              setRegisterError("");
          }
      }
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
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        label="E-mail"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        autofocus
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                <div className={classes.signUpRow}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        label="Birthday"
                        fullWidth
                        value={birthday}
                        onChange={onChangeBirthday}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        label="Repeat Password"
                        fullWidth
                        value={password2}
                        onChange={onChangePassword2}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                </div>
                <div className={classes.signUpRow}>
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                color="secondary"
                            />
                        }
                        label="Is Admin"
                    /> */}
                </div>
                {registerError !== "" ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{registerError}</Typography>
                    </div>
                ) : null}
                <div
                    className={classes.signUpRow + " " + classes.signUpButtons}
                >
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={onRegister}
                        disabled={
                            username === "" ||
                            birthday === "" ||
                            password === "" ||
                            password2 === "" ||
                            registerError !== "" ||
                            password !== password2
                        }
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
              </form>
            </div>
        </Container>
        </ThemeProvider>
      </div>
    );

}

export default UserSignupComponent;