import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/index';
import Layout from './hoc/layout';
import RegisterLogin from './components/login/index';
import Register from './components/login/register';
import UserDashboard from './components/User/index';
import Auth from './hoc/auth';
import Shop from './components/shop/index';
import AddProduct from './components/User/Admin/add_products';
import ManageCategories from './components/User/Admin/manage_categories';
import ProductPage from './components/product/index';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        

        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductPage, null)}
        />
        <Route path="/login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
