import React from 'react';
import Link from '@material-ui/core/Link';
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import KebabMenu from "./KebabMenu";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
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
  }));

/**
 * Footer of the app
 * @param {props} props
 */
 function Header(props) {

    const classes = useStyles();
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const user = useSelector((state) => {
      // return the currently logged in user from redux store
      return state.user;}
  );

    return (
      <header class="header">
      <AppBar style={{ background: '#33383b'}} position="static" color="default" elevation={0} className={classes.appBar}>
      <KebabMenu
                open={Boolean(menuAnchor)}
                anchor={menuAnchor}
                onClose={() => setMenuAnchor(null)}
            />
        <Toolbar className={classes.toolbar}>
          <Link variant="h6" color="inherit" href="/" className={classes.toolbarTitle}>
          <h2> Mobility<span>Connect</span></h2>
          </Link>
          <nav>
          { typeof(user.user) !== 'undefined' &&
          <Link variant="button" color="inherit" href="/map" className={classes.link}>
             Find Route
            </Link>
          }  
            
            { typeof(user.user) !== 'undefined' && 
            <Link variant="button" color="inherit" href="/tickets" className={classes.link}>
              Ticket Overview
            </Link>
            }
            { typeof(user.user) !== 'undefined' && 
            <Link variant="button" color="inherit" href="/packages" className={classes.link}>
              Packages
            </Link>
            }
            <IconButton
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <MenuIcon />
            </IconButton>
            
          </nav>
        </Toolbar>
      </AppBar>
      </header>

    );
}

export default Header;