import React from 'react';
import {mount} from 'react-mounter';

import Mainlayout from './containers/Mainlayouttheme.js';

import Home from './components/Home.jsx';

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
}
