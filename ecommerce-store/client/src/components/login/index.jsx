import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>GET AN ACCOUNT NOW</h1>
            <p>
              Save credit card details for faster shopping Manage your order
              history Gain access to your Wishlist
            </p>
            <MyButton
              type="default"
              title="REGISTER NOW"
              linkTo="register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
          <h2>REGISTERED CUSTOMERS</h2>
          <p>If you have a Suiting account, please enter your email and password.</p>
          <Login />
          </div>
          </div>
        </div>
      </div>
    
  );
};

export default RegisterLogin;
