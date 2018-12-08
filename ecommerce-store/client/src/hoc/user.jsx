import React from 'react';
import { Link } from 'react-router-dom';
import { generateData } from '../components/utils/Form/formActions';
import { link } from 'fs';
const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'My information',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];
const UserLayout = props => {

    const generateLinks =(links)=>(
        links.map((el,idx)=>(
            <Link to={el.linkTo} key={idx}>
            {el.name}
            </Link>

        ))
    )



  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};
export default UserLayout;
