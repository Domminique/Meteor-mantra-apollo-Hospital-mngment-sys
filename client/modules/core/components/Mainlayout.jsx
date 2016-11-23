import React from 'react';


const Mainlayout = ({user, content = () => null}) => {

  // authentication const
  const authentication = user
  ? <div style={{float: 'right'}}>
      <h1>You are logged in</h1>
      <br />
      <a href="/sign-out">Log Out</a>
    </div>
  : <a style={{float: 'right'}} href="/signup">Create Account</a>;


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
