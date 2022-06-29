import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

function PackageDeals(props) {

  const user = useSelector((state) => {
    // return the currently logged in user from redux store
    return state.user;
})
    // localStorage.setItem('mins', user.minutes);
    // localStorage.getItem('mins');
    const classes = useStyles();
    const [tiers, setUserData] = useState({});
    useEffect(() => {
      getWithFetch();
    }, []);

    const getWithFetch = async () => {
    const response = await fetch('http://localhost:4000/packages')
    const data = await response.json();
        if(response.ok){
          setUserData(data);
        }
        // check for error response
        else {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }  
    };
    
  var buttonDisabled = true;
  if(typeof(user.user) !== 'undefined'){
    var buttonDisabled = false;
  }
  const updateGlobal = (mins) =>{
    props.setGlobalState({
      minutes: mins
    })
  }

    const updateMinutes = async (param) => {
      
      var check = param;
      if (Math.abs(check[4])<props.globalState.minutes[4]){
      var mins = param.map(function (num, idx) {
        return Number(num) + Number(props.globalState.minutes[idx]);
      });
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
          localStorage.setItem("minutes",mins)
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
    }
    else {          
      Swal.fire({
      title: 'Error!',
      text: 'You dont have enough money..',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    })
    }
  };

    return (
      
    <ThemeProvider theme={themeColor}>
    <div>{tiers.map ?
        
        <div>
            <React.Fragment>
                <CssBaseline />
                {/* Hero unit */}
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Out of credits or money?
                </Typography>
                <Divider className={classes.headerDivider}/>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Reload Money <Link href="/payment" color="secondary"> <u>here</u> </Link> and have a look at our package deals below!
                </Typography>
                </Container>
                {/* End hero unit */}
                <Container component="main">
                <Grid container spacing={6} alignItems="flex-end">
                    {tiers.map((tier) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                        <Card>
                        <CardHeader
                            title={tier.title}
                            subheader={tier.subheader}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            action={tier.title === 'Pro' ? <StarIcon /> : null}
                            className={classes.cardHeader}
                        />
                        <CardContent>
                            <div className={classes.cardPricing}>
                            <Typography component="h2" variant="h4" color="textPrimary">
                                {tier.price}€
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                /once
                            </Typography>
                            </div>
                            <ul>
                            {tier.description.map((line) => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                {line}
                                </Typography>
                            ))}
                            </ul>
                        </CardContent>
                        <CardActions>
                            <Button disabled={buttonDisabled} fullWidth color="secondary" variant="contained" onClick={updateMinutes.bind(this, tier.minutes)}>
                            {tier.buttonText}
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </React.Fragment>
        </div> : <div>loading..</div>}</div>
        </ThemeProvider>
    );
    
}

export default withGlobalState(PackageDeals);