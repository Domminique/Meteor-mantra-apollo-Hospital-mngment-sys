import React from 'react';

import Setrole from '../containers/Setrolecontainer.js';

import Createpatient from '../containers/Createpatientcontainer.js';

import Viewpatients from '../containers/Viewpatientscontainer.js';

const Home = () => (
  <div>
    <Setrole />
    <div style={{height: 100}}/>
    <Createpatient />

    <div style={{height: 40}}/>
    <Viewpatients />
  </div>
)

export default Home;
