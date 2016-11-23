import React from 'react';


const Mainlayout = ({user, content = () => null}) => {

  // authentication const
  const authentication = user
  ? <div>
      <h3>You are logged in</h3>
      <br />
      <a href="/sign-out">Log Out</a>
    </div>
  : <a href="/sign_in">Log in</a>;


  return (
    <div>
      {/* the authentication const */}
      {authentication}
      <div style={{height:100}}/>
      {content()}
    </div>
  )
}

// the Mainlayout module
export default Mainlayout;
