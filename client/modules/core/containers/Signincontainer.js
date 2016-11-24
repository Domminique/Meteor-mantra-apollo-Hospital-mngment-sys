import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Signin from '../components/Login.jsx';

// we are quering to see if there is a user that is logged in
// if he aint logged in then the signup form can be viewed
export const composer = ({ context }, onData) => {
  const { Meteor, apolloClient, gql } = context();
  if (Meteor.userId()) {
    const query = gql`
      query getUser($id: String!) {
        user(id: $id) {
          _id
        }
      }
    `;

    apolloClient.query({
      query,
      variables: {
        id: Meteor.userId(),
      },
      forceFetch: true,
    }).then(({ data, errors }) => {
      if (errors) {
        errors.forEach((error) => {
          show({text: error.message});
        });
      }

      if (data) {
        onData(null, { user: data.user });
      }
    }).catch((error) => {
      onData(error);
    });
  }
  else {
    onData(null, { user: '' });
  }
};


export const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  signIn: actions.hospital.signIn,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Signin);
