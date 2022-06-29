import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import Euro from '@material-ui/icons/Euro';
import EventAvailable from '@material-ui/icons/EventAvailable';
import Box from '@material-ui/core/Box';
import Ticket from '../Pictures/ticket.png';
import { Image } from "semantic-ui-react";
import Popover from '@material-ui/core/Popover';
import QrCode from './QRCode';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 2,
};
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },
  head: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatarColor: {
    color: "#33383b",
    backgroundColor: "#33383b",
  },
  details: {
    padding: theme.spacing(2),
  },
  button:{
    textAlign: "center",
    padding: 8
  },
  ListItem:{
    paddingBottom: 0,
    paddingTop: 1
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
/**
* Menu for user managment
* @param {props} props
*/
export default function TicketDetails(props) {
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
     //props.setGlobalState({minutes: user.user.minutes});
     getWithFetch();
  }, []);
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // delete tickets

  const ticketRemove = async (id) => {
  const response = await fetch('http://localhost:4000/tickets/deleteTickets/'+id)
  const data = await response.json();
      // check for error response
      if (response.ok) {
      getWithFetch();
    }
      else {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }  
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  if(tickets.length > 0){
  return (
    <Box display="flex" justifyContent="center">
    {tickets.map((ticket) => (
    <Box borderColor="primary.main" {...defaultProps} >
    <List className={classes.root}>
    <div className={classes.head}>
    <Image avatar src={Ticket} width="83" height="80"/>
      Ticket Details</div> 
      <ListItem className={classes.ListItem}> 
        <ListItemAvatar>
          <Avatar className={classes.avatarColor}>
            <ConfirmationNumber style={{ color: "#0DD2D9" }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Type" secondary={ticket.type} />
      </ListItem>
      <ListItem className={classes.ListItem}>
        <ListItemAvatar>
          <Avatar className={classes.avatarColor}>
            <Euro style={{ color: "#0DD2D9" }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Price" secondary={ticket.price} />
      </ListItem>
      <ListItem className={classes.ListItem}>
        <ListItemAvatar>
          <Avatar className={classes.avatarColor}>
            <EventAvailable style={{ color: "#0DD2D9" }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Booking Date" secondary={ticket.validity} />
      </ListItem>
      <div className={classes.button}>
      <Button onClick={() => {ticketRemove(ticket._id)}} variant="contained" color="secondary">Remove</Button> 
      <Button aria-describedby={id} 
        onClick={handleClick} 
        type="button" 
        variant="contained"
        color="primary">
        View QR
      </Button>
      </div>
       <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
          height: 200,
          width: 200
           }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}>
        <QrCode className={classes.details} ticketId={ticket._id}/>     
        </Popover>
    </List>
    </Box>))}
    </Box>
  );}
  else{
    return(
      <div className={classes.alert}>
      <Alert severity="info">No active bookings found for the user — Please book your trip first </Alert>
    </div>
    );
  }
}


