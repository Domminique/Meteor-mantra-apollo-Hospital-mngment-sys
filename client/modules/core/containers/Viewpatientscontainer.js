import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Viewpatients from '../components/Viewpatients.jsx';

// the composer function
export const composer = ({ context }, onData) => {
  const { apolloClient, gql, Meteor, Roles } = context();


  const queryObservable = apolloClient.watchQuery({
    query: gql`
      query getPatients($limit: Int!) {
        patients(limit: $limit) {
          _id
          name
        }
      }
    `,
    // the number of patients to be returned
    variables: {
      limit: 20,
    },
    // checking for every half a second
    pollInterval: 500,
  });

  queryObservable.subscribe({
    next: ({ data, errors }) => {
      if (errors) {
        errors.forEach((error) => {
          console.log(error.message);
        });
      }
      // to return patients
      if (data.patients) {
        const user = Meteor.userId();
        // is the current user a doctor
        const userisDoctor = Roles.userIsInRole( user, 'doctor' );
        onData(null, { patients: data.patients, userisDoctor, user });
      }
    },
    error: (error) => {
      console.log(error);
    }
  });
};


export const depsMapper = (context, actions) => ({
  context: () => context,
  clearingPatient: actions.hospital.clearingPatient,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Viewpatients);
