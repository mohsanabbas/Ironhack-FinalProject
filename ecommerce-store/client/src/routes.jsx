import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/index';
import Layout from './hoc/layout';
import RegisterLogin from './components/login/index';
import Register from './components/login/register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
      <Route path='/register' exact component={ Register } />
        <Route path='/login' exact component={ RegisterLogin } />
        <Route path='/' exact component={ Home } />
      </Switch>
    </Layout>
  );
};

export default Routes;
