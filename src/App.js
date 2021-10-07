import React, { useState } from "react";

// We use Route in order to define the different routes of our application

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
// We import all the components we need in our app

import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import setAuthToken from "./utils/setAuthToken";
import DashBoard from "./components/dashboard";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import history from './history'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/signin";
  }
}

function App  ()  {
  const [token, setToken] = useState();

  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
        <Switch>
            <Route exact path="/">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Switch>
                
                <PrivateRoute exact path="/list">
                  <RecordList />
                </PrivateRoute>
                <PrivateRoute path="/edit/:id" component={Edit} />
                <PrivateRoute path="/create">
                  <Create />
                </PrivateRoute>
                <PrivateRoute path="/dashboard">
                  <DashBoard />
                </PrivateRoute>
            </Switch>
            
        </Switch>  
        </div>
      </Router>
    </Provider>
  );
};

export default App;
