import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/index';
import Layout from './hoc/layout';
import RegisterLogin from './components/login/index';
import Register from './components/login/register';
import UserDashboard from './components/User/index';
import Auth from './hoc/auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
      <Route path='/user/dashboard' exact component={ Auth(UserDashboard, true) } />  
      <Route path='/register' exact component={ Auth(Register, false) } />
        <Route path='/login' exact component={ Auth(RegisterLogin, false) } />
        <Route path='/' exact component={Auth(Home, null) } />
      </Switch>
    </Layout>
  );
};

export default Routes;
