  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Sidebar from '../components/Sidebar';
import MainHomepagePart from '../components/MainHomepagePart'
import HomepageBoxes from '../components/HomepageBoxes';
import TravelHomepage from '../Pictures/TravelHomepage.png';
import ShareNow from '../Pictures/ShareNow.jpg';
import MVG from '../Pictures/PublicTransport.jpg';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const mainHomepagePart = {
    title: 'Mobility Connect - Modern Intermodal Travel ',
    description:
      "If you want to get quick, cheap and fitted to your preferences from A to B in Munich then check our route finder.",
    image: TravelHomepage,
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };
  
  const featuredBoxes = [
    {
      title: 'Check out our newcomer',
      description:
        'We are happy to announce that ShareNow is now available on our platform',
      image: ShareNow,
      imageText: 'Image Text',
    },
    {
      title: 'Munich`s public transport offer',
      description:
        'Check out all the offers that the MVG and MVV offer for you',
      image: MVG,
      imageText: 'Image Text',
    },
  ];

  
  const sidebar = {
    title: 'More upcoming changes and new mobility providers',
    description:
      'We are constantly working on getting new mobility partners onboard. For munich we will be able to include multiple bike sharing companies. Furthermore we are planning to open a new location in the Netherlands. To get more information on that follow us on Twitter. You can see our Twitter on the bottom of the page.',

  }
  
  export default function Homepage() {
    const classes = useStyles();
    const user = useSelector((state) => {
      // return the currently logged in user from redux store
      return state.user;}
  );
  
    return (
      <ThemeProvider theme={themeColor}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <br/><br/>
          <main>
            <MainHomepagePart post={mainHomepagePart} />
            <Grid container spacing={4}>
              {featuredBoxes.map((post) => (
                <HomepageBoxes key={post.title} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                How to properly use our application:
                </Typography>
                <Divider />
                <br/>
                <Typography variant="subtitle1">
                1. 
                <Link href="/register" color="secondary"> <u>Sign up</u> </Link>
                or if already then 
                <Link href="/login" color="secondary"> <u>sign in</u> </Link>
                on the top right corner.
                <br/>
                2. Find <Link href="/map" color="secondary"> <u>your route</u> </Link>and choose your preferred means of travel.
                <br/>
                3. Follow the instructions on how to book your services. <br/> That can include car-,scooter or bikesharing and of course Munich's public transport.
                <br/>
                4. After choosing the preferred services you will be redirected to the payment provider.
                <br/>
                5. Finally you can follow the directions, open your vehicles and use your transport ticket.
                </Typography>
            </Grid>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                social={sidebar.social}
              />
            </Grid>
          </main>
        </Container>
      </React.Fragment>
      </ThemeProvider>
    );
  }