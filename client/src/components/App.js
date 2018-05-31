import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Projects from './ProjectsContainer/Projects';
import image from '../assets/img/test.png';
import store from './store';
import ProjectDetails from './ProjectsContainer/ProjectDetails';
import Register from './Register/Register';
import Login from './Login/Login';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { loginUser, onRequestLogout } from './actions/auth';

if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token get use info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  store.dispatch(loginUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logoutuser
    store.dispatch(onRequestLogout());
    //redirect to login when token expired
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <div className="layout">
              <Switch>
                <Route exact path="/" component={Projects} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />

                <Route exact path="/project/:id" component={ProjectDetails} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
