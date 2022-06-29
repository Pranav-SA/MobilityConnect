import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./redux/reducers";
import { Provider as GlobalProvider} from 'react-globally';

import LogInView from "./views/LogInView";
import SignUpView from "./views/SignUpView";
import Homepage from "./views/Homepage";
import JourneyView from "./views/JourneyView";
import PackagesView from "./views/PackagesView";
import TicketView from "./views/TicketView";
import NearbyVehiclesView from "./views/NearbyVehiclesView";
import RemainingMinutes from "./components/RemainingMinutes";
import DisplayMap from './views/DisplayMap';
import Footer from "./components/Footer";
import Header from "./components/Header";
import PaymentsView from './views/PaymentsView';
import WelcomAlert from './components/WelcomAlert';

const initialState = {
  minutes: [0,0,0,0,0,0,0],
}


function App() {

  const store = createStore(reducers, applyMiddleware(thunkMiddleware));

  return (
    <Provider store={store}>
    <GlobalProvider globalState={initialState}>
    <Router>
      <React.Fragment>
      <CssBaseline />
      <Header />
      </React.Fragment>
      <div className="container" id="page-container">
        <div id="content-wrap">
          <Route path="/" exact component={Homepage}/>
          <Route path="/journey" exact component={JourneyView}/>
          <Route path="/login" exact component={LogInView}/>
          <Route path="/register"exact component={SignUpView}/>
          <Route path="/packages" exact component={PackagesView}/>
          <Route path="/tickets" exact component={TicketView}/>
          <Route path="/remaining" exact component={RemainingMinutes}/>
          <Route path="/map" exact component={DisplayMap}/> 
          <Route path="/nearbyvehicles" exact component={NearbyVehiclesView}/> 
          <Route path="/payment" exact component={PaymentsView}/> 
          <Route path="/Welcome" exact component={WelcomAlert}/>
        </div>
      </div>
          <Footer/>
      </Router></GlobalProvider>
    </Provider>

  );
}

export default App;