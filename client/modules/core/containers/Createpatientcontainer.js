import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/Createpatient.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const { Meteor, Roles, LocalState } = context();

    const user = Meteor.user();
    const isReceptionist = Roles.userIsInRole( Meteor.userId(), 'receptionist' );
    const error = LocalState.get('SAVING_ERROR');
    onData(null, {user, isReceptionist, error});

    // clearErrors when unmounting the component
    return clearErrors;
};

export const depsMapper = (context, actions) => ({
  createPatient: actions.hospital.createPatient,
  clearErrors: actions.hospital.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
