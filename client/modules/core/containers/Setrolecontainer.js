import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Setrole from '../components/Setrole.jsx';

export const composer = ({context, clearErrors}, onData) => {
  const { Meteor, Roles, LocalState } = context();

    const user = Meteor.user();
    // is the current user a doctor
    const isDoctor = Roles.userIsInRole( Meteor.userId(), 'doctor' );
    // is the current user a receptionist
    const isReceptionist = Roles.userIsInRole( Meteor.userId(), 'receptionist' );
    const error = LocalState.get('SAVING_ERROR');
    onData(null, {user, isDoctor, isReceptionist, error});

    // clearErrors when unmounting the component
    return clearErrors;
};

export const depsMapper = (context, actions) => ({
  // setting user to doctor
  toDoctor: actions.hospital.toDoctor,
  // set user to receptionist
  toReceptionist: actions.hospital.toReceptionist,
  // clearing errors
  clearErrors: actions.hospital.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Setrole);
