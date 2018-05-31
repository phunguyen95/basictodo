import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import searchLogo from '../../assets/img/search.svg';
import './Header.scss';
import { withRouter } from 'react-router-dom';
import { onRequestLogout } from '../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Header extends Component {
  logOut = () => {
    this.props.onRequestLogout();
    this.props.history.push('/');
  };

  showAuthLink = user => {
    return (
      <div className="wrapped__menu">
        <ul className="menu__items">
          <li className="menu__item">
            <a onClick={event => this.logOut()}>
              <div className="rounded-circle-icon">
                <i className="fa fa-sign-out" />
              </div>
              <span className="fa__info_logout">Logout</span>
            </a>
          </li>
        </ul>
        <div className="welcome">
          <span className="fa__user_welcome">
            Hello <strong>{user.name}</strong>
          </span>
        </div>
      </div>
    );
  };
  showGuestLink = () => {
    return (
      <ul className="menu__items">
        <li className="menu__item">
          <Link to="/register">
            <div className="rounded-circle-icon">
              <i className="fa fa-registered" />
            </div>
            <span className="fa__info">Register</span>
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/login">
            <div className="rounded-circle-icon">
              <i className="fa fa-sign-in" />
            </div>
            <span className="fa__info">Login</span>
          </Link>
        </li>

        <li className="menu__item">
          <a href="https://www.facebook.com/profile.php?id=100009378927105">
            <div className="rounded-circle-icon">
              <i className="fa fa-map-marker" />
            </div>
            <span className="fa__info">Contact</span>
          </a>
        </li>
      </ul>
    );
  };
  render() {
    const { isAuthenticated, user } = this.props.user;

    return (
      <div>
        <header className="wrapped_navbar">
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="No image found" />
              </Link>
            </div>
            <div className="wrapped__menus">
              {isAuthenticated ? this.showAuthLink(user) : this.showGuestLink()}
            </div>
          </div>
          <hr className="line__break_nav_bar" />
        </header>
      </div>
    );
  }
}
Header.propTypes = {
  onRequestLogout: PropTypes.func,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth
});
export default connect(mapStateToProps, { onRequestLogout })(
  withRouter(Header)
);
