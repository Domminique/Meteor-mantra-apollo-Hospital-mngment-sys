import React from 'react';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {signIn} = this.props;
    const email = this.state.email;
    const password = this.state.password;
    signIn({email, password});
  }

  render() {
    const { user } = this.props;
    const {FlowRouter} = this.props;
    return (
      // the sign up form
      <div>
        {/* if the user is logged in see nothing */}
        {
          user
            ? ''
            :        <form onSubmit={this.handleSubmit}>
                      <h3>Login</h3>
                        <label>
                          email:
                          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                          <div style={{height: 50}}/>
                          password:
                          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <input type="submit" value="login" />
                      </form>
        }
      </div>
    );
  }
}
