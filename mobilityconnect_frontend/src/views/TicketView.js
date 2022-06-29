import React, { useEffect, useState }from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ticket from '../Pictures/ticket.png';
import stripeticket from '../Pictures/stripeticket.jpg';
import History from '../Pictures/city-transport.jpeg';
import airport from '../Pictures/airport.jpg';
import Popover from '@material-ui/core/Popover';
import TicketDetails from '../components/TicketDetails';
import { useSelector } from "react-redux";
import { withGlobalState } from 'react-globally';
import Swal from 'sweetalert2'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      link: {
        margin: theme.spacing(1, 1.5),
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      },
      cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
      },
      headerDivider: {
        margin: theme.spacing(2),
      },
      details: {
        padding: theme.spacing(2),
      },

    }));

    const themeColor = createMuiTheme({
      palette: {
        primary: {
          main: "#0DD2D9",
        },
        secondary: {
          main:"#414141",
    
        },
      },
    });

/**
* Menu for user managment
* @param {props} props
*/


function TicketView(props){

    const classes = useStyles();
    const user = useSelector((state) => {
      // return the currently logged in user from redux store
      return state.user;
    }
  );
  
  const [tickets, setTickets] = useState({});
  const getWithFetch = async (req,res) => {
    const response = await fetch('http://localhost:4000/tickets/listTickets/'+user.user._id)
    const data = await response.json();
     setTickets(data);
        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }  
    };
    useEffect(() => {
       var minutesDisplay = getCurrentMinutes();
       updateGlobal(minutesDisplay);
       getWithFetch();
    }, []);

    const updateGlobal = (mins) =>{
      props.setGlobalState({
        minutes: mins
      })
      localStorage.setItem("minutes",String(mins));
    }

    const getCurrentMinutes = () => {
      var mins = localStorage.getItem("minutes")
      mins = mins.split(",");
      mins.map((each,idx) => mins[idx] = Number(each));
      console.log(localStorage.getItem("minutes"))
      return mins
    }

    const updateStripes = () => {
      var mins = getCurrentMinutes();
      if (mins[4]>14){
      mins[3] += 10;
      mins[4]-= 14;
      helperfunctionAdd(mins);
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'You dont have enough money, please go to the payment page and add some to your balance',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
    }
  }

    const updateAirport = async () => {
      var mins = getCurrentMinutes();
      if (mins[4]>8){
      mins[4] -= 8; 
      mins[6] += 1;
      helperfunctionAdd(mins);
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'You dont have enough money, please go to the payment page and add some to your balance',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
    }

    }

    const updateDayticket = async () => {
      var mins = getCurrentMinutes();
      if (mins[4]>5){
      mins[4] -= 5;
      mins[5] += 1;
      helperfunctionAdd(mins);
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'You dont have enough money, please go to the payment page and add some to your balance',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
      })
  }

    }
    
    const onUse = async (param) =>{
      var today = new Date();
      var year = today.getFullYear();
      var mes = today.getMonth()+1;
      var dia = today.getDate();
      var dat =dia+"-"+mes+"-"+year;
      var userID = '-';
      if(typeof(user.user) !== 'undefined'){
        var userID = user.user._id;
      }
      var bod = {
      "type": param,
      "price": "-",
      "validity": dat,
      "user": userID}
      //console.log(JSON.stringify(bod))
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bod)
        };
        const response = await fetch('http://localhost:4000/tickets/generateTicket', requestOptions)
        const data = await response.json();
    };
    const helperfunctionAdd = async (mins) =>{

      //console.log(mins);
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
        if(response.ok){
          updateGlobal(mins);
          Swal.fire({
            icon: 'success',
            title: 'Purchase Successful',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          // get error message from body or default to response statusText
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
    };

    const deductAirport = () => {

      var mins = [props.globalState.minutes[0],props.globalState.minutes[1],props.globalState.minutes[2],props.globalState.minutes[3],props.globalState.minutes[4],props.globalState.minutes[5],props.globalState.minutes[6]-1];
      helperfunctionDed(mins);
      onUse("Airport Ticket");
      
    }

    const deductDay = () => {

      var mins = [props.globalState.minutes[0],props.globalState.minutes[1],props.globalState.minutes[2],props.globalState.minutes[3],props.globalState.minutes[4],props.globalState.minutes[5]-1,props.globalState.minutes[6]];
      helperfunctionDed(mins);
      onUse("Day Ticket");
      
    }

    const deductStripe = () => {

      var mins = [props.globalState.minutes[0],props.globalState.minutes[1],props.globalState.minutes[2],props.globalState.minutes[3]-1,props.globalState.minutes[4],props.globalState.minutes[5],props.globalState.minutes[6]];
      helperfunctionDed(mins);
      onUse("Stripes");
    }

    const helperfunctionDed = async (mins) =>{

      //console.log(mins);
      var bod = {
        "user": user.user,
        "minutes": mins
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bod)
        };
        console.log(requestOptions.body);
        const response = await fetch('http://localhost:4000/auth/update', requestOptions)
        const data = await response.json();
        if(response.ok){
          updateGlobal(mins);
          Swal.fire({
            icon: 'success',
            title: 'Use Succesful',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){
            window.location.reload(1);
         }, 1500);
        
        }
        else {
          // get error message from body or default to response statusText
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
    };




    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
  
    const id = open ? 'simple-popover' : undefined;

        return (
          <ThemeProvider theme={themeColor}>
            <div>
              <div>
                <React.Fragment>
                  <CssBaseline />
                  {/* Hero unit */}
                  <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                      Ticketoverview of your purchased and all available tickets
                    </Typography>
                    <Divider className={classes.headerDivider}/>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                      My Existing Tickets and History
                    </Typography>
                  </Container>
                  {/* End hero unit */}
                  <Container component="main">
                    <Grid container spacing={6} alignItems="flex-end">
                    {/* <Link variant="button" color="inherit" href="/ticketDetails" className={classes.link}> */}
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                        
                            <Card className={classes.root}>
                                <CardActionArea aria-describedby={id} onClick={handleClick}>
                                    <CardMedia
                                    component="img"
                                    alt="Dayticket"
                                    height="200"
                                    image={History}
                                    title="Dayticket"
                                    />
                                    <CardContent>
                                      <br/><br/><br/>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Booked Tickets
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Click to view latest tickets
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                  >
                                    <TicketDetails className={classes.details} tickets={tickets}/>
                                  </Popover>
                            </Card>

                        </Paper>
                        
                      </Grid>
                      {props.globalState.minutes[3] > 0 &&
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={stripeticket}
                                    title="Leftover Stripes"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Remaining stripes:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Leftover: {props.globalState.minutes[3]}
                                    </Typography>
                                    <br/>
                                    <Button fullWidth  color="secondary" variant="contained" onClick={deductStripe}>
                                        Use 1 stripe
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      }
                      {props.globalState.minutes[5] > 0 &&
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={ticket}
                                    title="Leftover Daytickets"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Your Daytickets:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Leftover: {props.globalState.minutes[5]}
                                    </Typography>
                                    <br/>
                                    <Button fullWidth color="secondary" variant="contained" onClick={deductDay}>
                                        Use 1 Dayticket
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      }
                      {props.globalState.minutes[6] > 0 &&
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={airport}
                                    title="Leftover Airport tickets"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Your Airport Tickets:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Leftover: {props.globalState.minutes[6]}
                                    </Typography>
                                    <br/>
                                    <Button fullWidth color="secondary" variant="contained" onClick={deductAirport}>
                                        Use 1 Airportticket
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      }
                    </Grid>
                  </Container>
                </React.Fragment>
               </div>
               <div className={classes.table}>
                <React.Fragment>
                <Container component="main" className={classes.heroContent}>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                      Check out other tickets that are up for purchase or click <Link href="/payment" color="secondary"> <u>here</u> </Link> to reload money first
                    </Typography>
                    <br></br>
                </Container>
                </React.Fragment>
                    <Container>
                        <Grid container spacing={6} alignItems="flex-end">
                        <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={airport}
                                    title="Airport ticket"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Airport ticket (8€)
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        One way to the munich airport (MUC) or the other way.
                                    </Typography>
                                    <br/>
                                    <Button fullWidth color="secondary" variant="contained" onClick={updateAirport}>
                                        Buy
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={stripeticket}
                                    title="Stripeticket"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Stripeticket (14€)
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Get yourself 10 stripes and use them whenever needed.
                                    </Typography>
                                    <br/>
                                    <Button fullWidth color="secondary" variant="contained" onClick={updateStripes}>
                                        Buy
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={ticket}
                                    title="Dayticket"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Dayticket (5€)
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Perfect ticket if you need to travel on a certain day multiple times.
                                    </Typography>
                                    <br/>
                                    <Button fullWidth color="secondary" variant="contained" onClick={updateDayticket}>
                                        Buy
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Paper>
                      </Grid>
                      </Grid>
                    </Container>
                
               </div>
            </div>
            </ThemeProvider>
        );
    
    }
export default withGlobalState(TicketView);