import React from 'react';

// the function that determines what role a person plays in the hospital
const renderSwitchRoleButton = ({user, isDoctor, isReceptionist}) => {
  // if you are a doctor you can become a receptionist
  if (isDoctor) {
    return (

      <div>
        <h3>Switch to being a Receptionist</h3>
        <button>Become a Receptionist</button>
      </div>

      );
  } else if(isReceptionist) {
      return (
        // if you are a receptionist you can become a doctor
        <div>
          <h3>Switch to being a doctor</h3>
          <button>Become a doctor</button>
        </div>
      );
  } else if(!isReceptionist && !isDoctor && user) {
    // if you are neither but you are logged in.. you can chose either of the two roles
    return (
      <div>
        <button>Become a Doctor</button> <button>Become a Receptionist</button>
      </div>
    );
  }
else {
  // if you are not logged in... you are given a login option
    return (
      <div>
        <a href="/login"><button>Login</button></a>
      </div>
    )
  }
};

const Setrole = ({user, isDoctor, isReceptionist}) => (
  <div>
    {renderSwitchRoleButton({user, isDoctor, isReceptionist})}
  </div>
)

export default Setrole;
