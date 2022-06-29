import React, { useEffect, useState }from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import creditcard from '../Pictures/creditcard.png';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2'
import { withGlobalState } from 'react-globally';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
      secondary: {
        main:"#414141",
      },
    },
  });

/**
* Menu for user managment
* @param {props} props
*/

function PaymentComponent(props) {

  const [amount,setAmount] = React.useState(null);
  const [name, setName] = React.useState("");
  const [card, setCard] = React.useState("");
  const [expiring, setExpiring] = React.useState("");
  const [security, setSecurity] = React.useState("");

  
  const history = useHistory();

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
};

const onChangeName = (e) => {
  setName(e.target.value);
};

const onChangeCard = (e) => {
  setCard(e.target.value);
};

const onChangeExpiring = (e) => {
  setExpiring(e.target.value);
};

const onChangeSecurity = (e) => {
  setSecurity(e.target.value);
};
  
  const user = useSelector((state) => {
    // return the currently logged in user from redux store
    return state.user;
})
useEffect(() => {
  console.log(props.globalState.minutes)
}, []);

const updateGlobal = (mins) =>{
  console.log(mins)
  props.setGlobalState({
    minutes: mins
  })
  localStorage.setItem("minutes",mins)
}  
const topUpMoney = async () => {
    var mins = localStorage.getItem("minutes");
    mins = mins.split(",");
    mins.map((each,idx) => mins[idx] = Number(each));
    if (amount>0)
    {
    mins[4] += Number(amount);
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
  }
  else {          
    Swal.fire({
    title: 'Error!',
    text: 'Please check your input',
    icon: 'error',
    showConfirmButton: false,
    timer: 1500
  })
  }
  };

    return (
      <div >
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                    <CardMedia image={creditcard} component="img" alt="Euros" height="220"/>
                    <Typography variant="h6">How much would you like to add to your balance?</Typography>
                    <Divider color="secondary"/>
                    <TextField name="amount" label="Amount in €" margin="normal" variant="outlined" fullWidth="true" color="secondary" onChange={onChangeAmount}/>
                    <br/><br/>
                    <Typography variant="h6">Please enter your credit card details.</Typography>
                    <Divider color="secondary"/>
                    <TextField name="name" label="Name" margin="normal" variant="outlined" fullWidth="true" color="secondary" onChange={onChangeName}/>
                    <TextField name="card" label="Card Number" placeholder="XXXX-XXXX-XXXX-XXXX" margin="normal" variant="outlined" fullWidth="true" color="secondary" onChange={onChangeCard}/>
                    <TextField name="expiring" label="Expiry Date" placeholder="Month / Year" margin="normal" variant="outlined" fullWidth="true" color="secondary" onChange={onChangeExpiring}/>
                    <TextField name="security" label="Security Code" placeholder="XXX" margin="normal" variant="outlined" fullWidth="true" color="secondary"onChange={onChangeSecurity}/>
                    <br/><br/>
                    <Button variant="contained" color="secondary" fullWidth onClick={topUpMoney} disabled={name === "" || card === "" || expiring === "" || security === ""}>Pay</Button>
            </Container>
        </ThemeProvider>
      </div>
    );
  }

  export default withGlobalState (PaymentComponent);