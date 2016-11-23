import React from 'react';

export default class Signup extends React.Component {
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
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const { user } = this.props;
    return (
      // the sign up form
      <div>
        {/* if the user is logged in see nothing */}
        {
          user
            ? ''
            :        <form onSubmit={this.handleSubmit}>
                        <label>
                          email:
                          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                          <div style={{height: 50}}/>
                          password:
                          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <input type="submit" value="Create Account" />
                      </form>
        }
      </div>
    );
  }
}
