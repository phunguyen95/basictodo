import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRequestRegister } from '../actions/auth';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.onRegister(newUser, this.props.history);
  };
  //check new props from redux after user submit
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user) {
      return {
        errors: nextProps.user.errors
      };
    }
  }
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your ProWorkFlow account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors ? errors.name : ''}
                  name="name"
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors ? errors.email : ''}
                  name="email"
                  info="Email should be long enough"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors ? errors.password : ''}
                  name="password"
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm your password"
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                  error={errors ? errors.confirmPassword : ''}
                  name="confirmPassword"
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onRegister: (user, history) => {
      dispatch(onRequestRegister(user, history));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Register)
);
