import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useSelector } from "react-redux";
import { withGlobalState } from 'react-globally';

import bikes from '../Pictures/bikes.jpg';
import car from '../Pictures/car.jpg';
import scooter from '../Pictures/scooter.jpg';
import stripes from '../Pictures/stripes.jpeg';
import euro from '../Pictures/euro.jpeg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    heroContent: {
      padding: theme.spacing(4, 0, 6),
      display: 'flex',
    },
  }));
/**
 * Menu for user managment
 * @param {props} props
 */

function RemainingMinutes(props) {

    const classes = useStyles();
    const user = useSelector((state) => {
      // return the currently logged in user from redux store
      return state.user;}
  );
  useEffect(() => {
    var mins = localStorage.getItem("minutes");
    mins = mins.split(",");
    mins.map((each,idx) => mins[idx] = Number(each));
    props.setGlobalState({
      minutes: mins
    })
  }, []);
  
  if(typeof(user.user) !== 'undefined'){
  return (
    <div className={classes.root}>
      <br/><br/>
          <Typography variant="h4" align="center" color="textPrimary" component="p">
              Balance
          </Typography>
      <Container component="main" className={classes.heroContent}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
      </Container>
    </div>
  );}
  else{
    return(
      <Container component="main" className={classes.heroContent}>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
              Login to view your remaining minutes.
          </Typography>
      </Container>
    );
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      alt="Euros"
                      height="200"
                      image={euro}
                      title="Balance: Euros"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Balance: Euros
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Remaining Euros: {props.globalState.minutes[4]}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
                  </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      alt="Bike Sharing"
                      height="200"
                      image={bikes}
                      title="Bike Sharing"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          Bike
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Remaining minutes: {props.globalState.minutes[0]}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
                  </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      alt="Car Sharing"
                      height="200"
                      image={car}
                      title="Car Sharing"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          Car
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Remaining minutes: {props.globalState.minutes[1]}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
                  </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      alt="Scooter Sharing"
                      height="200"
                      image={scooter}
                      title="Scooter Sharing"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          Scooter
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Remaining minutes: {props.globalState.minutes[2]}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      alt="Stripes"
                      height="200"
                      image={stripes}
                      title="MVG Stripes"
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                          MVG Stripes
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Remaining Stripes: {props.globalState.minutes[3]}
                      </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withGlobalState(RemainingMinutes);