import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { withGlobalState } from 'react-globally';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container, Grid, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Divider,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@material-ui/core';

// theme 

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#414141",
    },
    secondary: {
      main: "#33383b",
    },
  },
});

// component styles

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function NearbyCars(props) {
  const classes = useStyles();

  // list all available cars

  const [cars, setData] = useState([]);
  useEffect(() => {
    getWithFetch();
  }, []);

  const getWithFetch = async () => {
    const response = await fetch('http://localhost:4000/cars/nearbycars')
    const data = await response.json();
    if (response.ok) {
      setData(data);
    }
    else {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  };

  // update global car minutes after unlocking 

  const [plannedmins, setDeduct] = React.useState(null);

  const onChangeDeduct = (e) => {
    setDeduct(e.target.value);
  };

  const updateGlobal = (mins) => {
    props.setGlobalState({
      minutes: mins
    })
    localStorage.setItem("minutes",mins);
  }

  const history = useHistory();

  useEffect(() => {
    var mins = localStorage.getItem("minutes");
    mins = mins.split(",");
    mins.map((each,idx) => mins[idx] = Number(each));
    props.setGlobalState({
      minutes: mins
    })
  }, []);

  const user = useSelector((state) => {
    // return the currently logged in user from redux store
    return state.user;
  })

  const deductCarMins = async () => {

    if (plannedmins < props.globalState.minutes[1]) {
      var mins = [props.globalState.minutes[0], props.globalState.minutes[1] - Number(plannedmins), props.globalState.minutes[2], props.globalState.minutes[3], props.globalState.minutes[4], props.globalState.minutes[5], props.globalState.minutes[6]];
      var bod = {
        "user": user.user,
        "minutes": mins
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bod)
      };
      const response = await fetch('http://localhost:4000/auth/update', requestOptions)
      const data = await response.json();
      if (response.ok) {
        handleClose();
        updateGlobal(mins);
        Swal.fire({
          icon: 'success',
          title: 'Unlocking successful',
          showConfirmButton: true,
          confirmButtonColor: '#414141',
          confirmButtonText: 'Go to overview page',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/packages");
          }
        })
      }
      else {
        handleClose();
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong..',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }
    else {
      handleClose();
      Swal.fire({
        title: 'Error!',
        text: 'Your balance is too low.',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#414141',
        confirmButtonText: 'Recharge here',
      })
        .then((result) => {
          if (result.isConfirmed) {
            history.push("/payment");
          }
        })
    }
  };

  // for dialog react component

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // return section

  return (
    <div>{cars.map ?
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <br />
          <Container maxWidth="lg" className={classes.heroContent}>
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Would you like to travel by carsharing?
            </Typography>
            <Divider className={classes.headerDivider} />
            <br />
            <Typography variant="h5" align="center" color="textSecondary" component="p">
              - Unlock any available nearby car here.
            </Typography>
            <br /><br />
            <Grid container spacing={3}>
              {cars.map((car) => (
                <Grid item xs={4}>
                  <div className={classes.paper}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {car.model}
                          </Typography>
                          <CardMedia
                            component="img"
                            alt="Car Image"
                            height="200"
                            image={`data:image/jpeg;base64,${car.img}`}
                            title="Car Image"
                          />
                          <br />
                          <Typography variant="body2" component="p" align="left">
                            Number plate: {car.numberPlate}
                          </Typography>
                          <Typography variant="body2" component="p" align="left">
                            Seats: {car.capacity}
                          </Typography>
                          <Typography variant="body2" component="p" align="left">
                            Fuel: {car.fuelLevel}
                          </Typography>
                          <Typography variant="body2" component="p" align="left">
                            Mileage: {car.mileage}
                          </Typography>
                          <Typography variant="body2" component="p" align="left">
                            Color: {car.color}
                          </Typography>
                          <Typography variant="body2" component="p" align="left">
                            Location: {car.locationParked}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          onClick={handleClickOpen}
                          fullWidth
                          color="primary"
                          variant="contained"
                        >Unlock car</Button>
                        <Dialog open={open} onClose={handleClose} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                          <DialogTitle id="form-dialog-title">Unlock car</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Please enter, for how many minutes you will use the car.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              name="plannedmins"
                              label="Minutes of car use e.g. 20"
                              color="secondary"
                              fullWidth
                              onChange={onChangeDeduct}
                              helperText={(plannedmins != parseInt(plannedmins, 10)) ? 'Please populate field with positive numbers' : ' '}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={deductCarMins} color="primary" disabled={plannedmins === null || plannedmins === "" || plannedmins != parseInt(plannedmins, 10) || parseInt(plannedmins, 10) < 0}>
                              Add minutes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      </div> : <div>loading..</div>}</div>
  );
}

export default withGlobalState(NearbyCars);