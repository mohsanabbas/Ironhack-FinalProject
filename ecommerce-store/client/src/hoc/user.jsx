
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
const admin = [
  {
      name: 'Site info',
      linkTo: '/admin/site_info'
  },
  {
      name: 'Add new suits',
      linkTo: '/admin/add_product'
  },
  {
      name: 'Manage categories',
      linkTo: '/admin/manage_categories'
  }
]

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
          { props.user.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                { generateLinks(admin)}
                            </div>
                        </div>
                    :null
                    }
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}
export default connect(mapStateToProps)(UserLayout);
