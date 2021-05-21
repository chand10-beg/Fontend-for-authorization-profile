import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './signup/SignUp';
import Profile from './profile/profile';
import PrivateRoute from './routing/PrivateRoute';
import LogIn from './log-in/log-in';
function App() {
  return (
    <React.Fragment>
   
    <Router>
    {/* <PrivateRoute exact path="/profile/:username" component={Profile}/> */}
      <PrivateRoute exact path="/profile/:username" component={Profile}/>
      <Route exact path ='/' exact component = {LogIn}></Route>
      <Route   exact path ='/sign-up'component ={SignUp}></Route>
      {/* <Route  exact path ='/log-in' exact component ={LogIn}></Route>
      <Route   exact path ='/sign-up'component ={SignUp}></Route>
      <Route path = "/ForgetPassword" component ={ForgetPassword}></Route>
      <Route path = "/passwordreset/:resetToken" component ={ResetPassword}></Route>
      <Route path ="/auction/:auctionID" component ={AuctionDetails}></Route>
      <Route path="/allBids/:auctionID" component ={AllBids}></Route> */}
    </Router>
  </React.Fragment>
  );
}

export default App;
