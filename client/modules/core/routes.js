import React from 'react';
import {mount} from 'react-mounter';

import Mainlayout from './containers/Mainlayoutcontainer.js';

import Home from './components/Home.jsx';

import Signup from './containers/Signupcontainer.js';

import Signin from './containers/Signincontainer.js';

// the routing takes place here
export default function (injectDeps) {

   const MainLayoutCtx = injectDeps(Mainlayout);

  FlowRouter.route('/', {
    name: 'Home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  // sign up route
  FlowRouter.route('/signup', {
    name: 'Sign Up',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Signup />)
      });
    }
  });

  // sign in route
  FlowRouter.route('/login', {
    name: 'Sign In',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Signin />)
      });
    }
  });

  // sign-out route
  // sign out
  FlowRouter.route('/sign-out', {
    name: 'auth.signOut',
    action() {
      Meteor.logout((error) => {
        if (error) {
          return show({text: 'Log Out Error'});
        }
        FlowRouter.go('/');
        alert("You have been logged out");
      });
    }
  });
}
