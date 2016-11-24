import React from 'react';


const Mainlayout = ({user, content = () => null}) => {

  // authentication const
  const authentication = user
  ? <div style={{float: 'right'}}>
      <a href="/sign-out">Log Out</a>
    </div>
  : <div>
      <a style={{float: 'right',margin: 10}} href="/signup">Create Account</a>
      <a style={{float: 'right',margin: 10}} href="/login">Login</a>
    </div>


  return (
    <div>
      <h3 style={{float: 'left'}}>My hospital</h3>
      {/* the authentication const */}
      {authentication}
      <div style={{height:100}}/>
      {content()}
    </div>
  )
}

// the Mainlayout module
export default Mainlayout;
