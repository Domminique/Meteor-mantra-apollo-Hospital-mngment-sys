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
},


// set user to doctor role
  toDoctor({Meteor, apolloClient, LocalState, gql}, {userId}) {
    // if the UserId is not set
    if (!userId) {
      return LocalState.set('SAVING_ERROR', 'There was an error');
    }

    // the LocalState error
    LocalState.set('SAVING_ERROR', null);
    const mutation = gql`
      mutation setUserToDoctor (
        $userId: String!,
      ) {
        makedoctor(userId: $userId)
      }
    `;
    apolloClient.mutate({
      mutation,
      variables: { userId },
    }).then(({ data, errors }) => {
      if (errors) {
        errors.forEach((error) => {
        console.log(error);
        });
      }

      if (data.makedoctor) {
        console.log("success");
      }
    }).catch((error) => {
      console.log(error.message);
    });
  },

  // setting user to a receptionist
  toReceptionist({Meteor, apolloClient, LocalState, gql}, {userId}) {
    // if the UserId is not set
    if (!userId) {
      return LocalState.set('SAVING_ERROR', 'There was an error');
    }

    // the LocalState error
    LocalState.set('SAVING_ERROR', null);
    const mutation = gql`
      mutation setUserToReceptionist (
        $userId: String!,
      ) {
        makereceptionist(userId: $userId)
      }
    `;
    apolloClient.mutate({
      mutation,
      variables: { userId },
    }).then(({ data, errors }) => {
      if (errors) {
        errors.forEach((error) => {
        console.log(error);
        });
      }

      if (data.makereceptionist) {
        console.log("success");
      }
    }).catch((error) => {
      console.log(error.message);
    });
  },

  // createPatient
  createPatient({apolloClient, gql, LocalState}, {name}) {
    // if the name is not set
    if (!name) {
      return LocalState.set('SAVING_ERROR', 'Name is not set');
    }

    // the LocalState error
    LocalState.set('SAVING_ERROR', null);
		const mutation = gql `
			mutation creatingpatient(
				$name: String!,
			) {
				createpatient(name: $name)
			}
		`;

		apolloClient.mutate({
			mutation,
			// the variable to be inserted to the collection (Posts)
			variables: { name },
		}).then(({ data, errors }) => {
			if (errors) {
				errors.forEach((error) => {
					console.log(error.message);
				});
			}
			// if data is inserted
			if (data.createpatient) {
				console.log("success");
			}
		}).catch((error) => {
			console.log(error.message);
		});

},

// clearing the patient..

clearingPatient({apolloClient, gql, LocalState, Roles}, {patientId}) {
  // patientId, userId
  if (!Roles.userIsInRole( Meteor.userId(), 'doctor' )) {
    return LocalState.set('SAVING_ERROR', 'Switch to being a doctor first then you can clear a patient');
  }

  // the LocalState error
  LocalState.set('SAVING_ERROR', null);
  const mutation = gql `
    mutation clearpatient(
      $patientId: String!,
    ) {
      clearpatient(patientId: $patientId)
    }
  `;

  apolloClient.mutate({
    mutation,
    // the variable to be inserted to the collection (Posts)
    variables: { patientId },
  }).then(({ data, errors }) => {
    if (errors) {
      errors.forEach((error) => {
        console.log(error.message);
      });
    }
    // patient has been cleared
    if (data.clearpatient) {
      console.log("success");
    }
  }).catch((error) => {
    console.log(error.message);
  });

},


  // clearing the errors
  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }

}
