import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/index';
import Layout from './hoc/layout';
import RegisterLogin from './components/login/index'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/login' exact component={ RegisterLogin } />
        <Route path='/' exact component={ Home } />
      </Switch>
    </Layout>
  );
};

export default Routes;
