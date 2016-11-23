import React from 'react';
import {mount} from 'react-mounter';

import Mainlayout from './containers/Mainlayoutcontainer.js';

import Home from './components/Home.jsx';

import Signup from './containers/Signupcontainer.js';

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
  })
}
