import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
const UserDashboard = ({user}) => {
  return (
    <UserLayout>
      <div>
          <div className='user_nfo_panel'>
          <h1>User Information</h1>
          <div>
              <span>{user.userData.name}</span>
              <hr/>
              <span>{user.userData.lastname}</span>
              <hr/>
              <span>{user.userData.email}</span>
              <hr/>
          </div>
          <MyButton
          type ='default'
          title ='Edit Account Info'
          linkTo ='/user/user_profile' 

          />
          </div>
          <div className='user_nfo_panel'>
          <h1>History of Purchases</h1>
          <div className = 'user_product_block_wrapper'>
          history

          </div>

          </div>
      </div>
    </UserLayout>
  );
};
export default UserDashboard;
