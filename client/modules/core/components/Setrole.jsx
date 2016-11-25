import React from 'react';

export default class Setrole extends React.Component {
  constructor(props) {
    super(props);
    this.setUserToDoctor = this.setUserToDoctor.bind(this);
    this.setUserToReceptionist = this.setUserToReceptionist.bind(this);

  }

  // setUserToDoctor
  setUserToDoctor() {
    // user props
    const {user} = this.props;
    const userId = user._id;
    const {toDoctor} = this.props;
    toDoctor({userId});
  }

// toReceptionist
setUserToReceptionist() {
  // user props
  const {user} = this.props;
  const userId = user._id;
  const {toReceptionist} = this.props;
  toReceptionist({userId});
}

  render() {
    const { user } = this.props;
    const {isDoctor} = this.props;
    const {isReceptionist} =  this.props;
    const {error} = this.props;
    const renderSwitchRoleButton = ({user, isDoctor, isReceptionist}) => {
      // if you are a doctor you can become a receptionist
      if (isDoctor) {
        return (

          <div>
            <h3>Switch to being a Receptionist</h3>
            <button onClick={this.setUserToReceptionist}>Become a Receptionist</button>
          </div>

          );
      } else if(isReceptionist) {
          return (
            // if you are a receptionist you can become a doctor
            <div>
              <h3>Switch to being a doctor</h3>
              <button onClick={this.setUserToDoctor}>Become a doctor</button>
            </div>
          );
      } else if(!isReceptionist && !isDoctor && user) {
        // if you are neither but you are logged in.. you can chose either of the two roles
        return (
          <div>
            <button onClick={this.setUserToDoctor}>Become a Doctor</button>
            <button onClick={this.setUserToReceptionist}>Become a Receptionist</button>
          </div>
        );
      }
    else {
      // if you are not logged in... you are given a login option
        return (
          <div>
            <h3>Login to see your role or even switch roles</h3>
            <a href="/login"><button>Login</button></a>
          </div>
        )
      }
    };

    return (
      <div>

          {/* the error displayed here */}
          {error
            ?   <h3 style={{textAlign: 'center', color: 'red'}}>{error}</h3>
            : null}

          {renderSwitchRoleButton({user, isDoctor, isReceptionist})}
      </div>
    );
  }
}
