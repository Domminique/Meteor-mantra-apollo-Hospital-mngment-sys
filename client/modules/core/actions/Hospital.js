export default {
// sign up
signUp({ Meteor, Accounts, FlowRouter },
  { email, password }) {
  Accounts.createUser({
    email,
    password,
  }, (error) => {
    if (error) {
      return console.log(error.message);
    }
    FlowRouter.go('/');
  });
},

// sign in
signIn({ Meteor, apolloClient, FlowRouter }, { email, password }) {
  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      alert(error.message);
    } else {
      alert("Login successfull");
      FlowRouter.go('Home');
    }
  });
}

}
