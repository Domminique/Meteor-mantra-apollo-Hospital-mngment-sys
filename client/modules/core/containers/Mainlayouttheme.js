import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Mainlayout from '../components/Mainlayout.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, apolloClient, gql, show } = context();
  if (Meteor.userId()) {
    const query = gql`
      query getUser($id: String!) {
        user(id: $id) {
          profile {
            firstName
          }
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
  // create: actions.schedule.create,
  // handleSearch: actions.schedule.handleSearch,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Mainlayout);
