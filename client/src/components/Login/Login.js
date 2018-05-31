import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onRequestLogin } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.onRequestLogin(user);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //checking new props received by redux
  static getDerivedStateFromProps(nextProps) {
      //check if is there errors when user submit the form
    if (nextProps.user.errors) {
      return {
        errors: nextProps.user.errors
      };
    }
    if (nextProps.user.isAuthenticated) {
      //redirect user after login succesful
      nextProps.history.push('/');
    }
  }
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      //redirect user to homepage when user tryinng to connect to this route after authenticated
      this.props.history.push('/');
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your ProWorkFlow account
              </p>
              <form onSubmit={this.onSubmit}>
              {/*Pass values to textfieldgroup as props then it will be handle in that component*/}
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  name="email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  name="password"
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
const mapStateToProps = state => ({
  user: state.auth,
  errors: state.errors
});
const mapDispatchToProps = dispatch => {
  return {
    onRequestLogin: (user, history) => {
      //
      return dispatch(onRequestLogin(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
