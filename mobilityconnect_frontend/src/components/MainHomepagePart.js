import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mainAreaHomepage: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    paddingLeft: 15,
    paddingBottom: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

  },
  mainAreaHomepageContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
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

export default function MainAreaHomepage(props) {
  const classes = useStyles();
  const { post } = props;
  const user = useSelector((state) => {
    // return the currently logged in user from redux store
    return state.user;}
);

  return (
    <ThemeProvider theme={themeColor}>
    <Paper className={classes.mainAreaHomepage} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
      <CardActionArea component="a">
        <Grid item md={6}>
          <div className={classes.mainHomepagePartContent}>
            <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
              {post.title}
            </Typography>
            <br/>
            <Typography variant="h5" color="textPrimary" paragraph>
              {post.description}
            </Typography>
            <br/>
            <Link color="secondary" variant="subtitle1" href="/map" style={{textDecoration:"none"}}>
              Click <u>here</u> to find a route.
            </Link>
          </div>
        </Grid>
      </CardActionArea>
      </Grid>
    </Paper>
    </ThemeProvider>
  );
}

MainAreaHomepage.propTypes = {
  post: PropTypes.object,
};