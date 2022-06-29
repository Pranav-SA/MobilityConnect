import React from 'react';
import Map from '../components/DisplayMapClass';
import MapPosition from '../components/MapPosition';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withGlobalState } from 'react-globally';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
/**
 * 
 * @param {props} props
 */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0DD2D9",
    },
    secondary: {
      main:"#414141",

    },
  },
});

class MapApp extends React.Component {
  constructor(props) {
    super(props);
    // if(typeof(user.user) !== 'undefined'){
    //   var userID = user.user._id;
    //   var buttonDisabled = false;
    // }
    this.state = {
      zoom: 12,
      lat: 48.137154,
      lng: 11.576124,
      expanded: false
    }
  }
  handleMapViewChange = (zoom, lat, lng) => {
    this.setState({
      lat,
      lng,
      zoom
    })
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  handleChange2 = (panel) => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false});
  };
  render() {
    const {
      zoom,
      lat,
      lng
    } = this.state;
    return (
      <Container maxWidth>
      <ThemeProvider theme={theme}>
      <div className="App">
       <MapPosition
          lat={lat}
          lng={lng}
          onChange={this.handleInputChange}
          zoom={zoom}/>
        <Map
      lat={lat}
      lng={lng}
      onMapViewChange={this.handleMapViewChange}
      zoom={zoom}/>
      <br/><br/>
      <div id="mainPanel">
      <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange2('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <div id="panelSub1"></div>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg">
            <Paper elevation={3}>
            <br/>
            <div id="panel1"/>
            <br/>
            <Button color="primary"  variant="contained" color="secondary" href="/nearbyvehicles">
                 Book a car
            </Button>
            &nbsp; 
            <Button color="primary" variant="contained" color="secondary" href="/tickets">
                 Buy and use public transport tickets
            </Button>
            {/* <Button color="primary"  variant="contained" style={{float: 'right'}} color="primary" href="/#">
                 Book journey
            </Button> */}
            </Paper>
          </Container>
        </AccordionDetails>
        </Accordion>

        <Accordion expanded={this.state.expanded === 'panel2'} onChange={this.handleChange2('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <div id="panelSub2"></div>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg">
            <Paper elevation={3}>
            <br/>
            <div id="panel2"/>
            <br/>
            <Button color="primary"  variant="contained" color="secondary" href="/nearbyvehicles">
                 Book a car
            </Button>
            &nbsp; 
            <Button color="primary" variant="contained" color="secondary" href="/tickets">
                 Buy and use public transport tickets
            </Button>
            {/* <Button color="primary"  variant="contained" style={{float: 'right'}} color="primary" href="/#">
                 Book journey
            </Button> */}
            </Paper>
          </Container>
        </AccordionDetails>
        </Accordion>

        <Accordion expanded={this.state.expanded === 'panel3'} onChange={this.handleChange2('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <div id="panelSub3"></div>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg">
            <Paper elevation={3}>
            <br/>
            <div id="panel3"/>
            <br/>
            <Button variant="contained" color="secondary" href="/nearbyvehicles">
                 Book a car
            </Button>
            &nbsp; 
            <Button variant="contained" color="secondary" href="/tickets">
                 Buy and use public transport tickets
            </Button>
            {/* <Button color="primary"  variant="contained" style={{float: 'right'}} color="primary" href="/#">
                 Book journey
            </Button> */}
            </Paper>
          </Container>
        </AccordionDetails>
        </Accordion>
        </div>
    </div>
    </ThemeProvider>
    </Container>

    );
  }
}
export default withGlobalState(MapApp)