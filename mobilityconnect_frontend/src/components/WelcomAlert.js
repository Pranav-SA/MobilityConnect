import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dialog, DialogActions, DialogTitle, Button, CardActions, DialogContentText
} from '@material-ui/core';

/**
 * For register new users
 * @param {props} props
 */

export default function WelcomeAlert(props) {

  const user = useSelector((state) => {
    // return the currently logged in user from redux store
    return state.user.user;
  }
  );

  if (typeof (user.user) !== 'undefined') {
    console.log(user.user.minutes);
    localStorage.setItem("minutes", String(user.user.minutes))
  }
  
  return (
    <CardActions>
      <Dialog open="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <DialogTitle id="form-dialog-title">Data Policy</DialogTitle>
        <DialogContentText id="alert-dialog-slide-description" style={{ padding:"2rem" }}>
            Disclaimer: Our website stores the user data in their personal machine. The user can delete the stored data by clearing the cache.
          </DialogContentText>
        <DialogActions>
          <Button href="/">
            Proceed to homepage
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>
  );
}

