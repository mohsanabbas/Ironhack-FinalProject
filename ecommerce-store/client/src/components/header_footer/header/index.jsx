import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

class Header extends Component {
  state = {
    page :[
      {
        name:'Home',
        linkTo:'/',
        public: true

      },
      {
        name:'Suits',
        linkTo:'/shop',
        public: true

      }

    ],
    user:[
      {
        name:'My Cart',
        linkTo:'/user/cart',
        public: false

      },
      {
        name:'My account',
        linkTo:'/user/dashboard',
        public: false 

      },
      {
        name:'Log in',
        linkTo:'/login',
        public: true

      },
      {
        name:'Log out',
        linkTo:'/user/logout',
        public: false

      }

    ]
  }
  defaultlink =(item,i)=>(
    <Link to ={item.linkTo} key={i}>
    {item.name}
    </Link>
  )

  
  showLinks = (type) => {
    let list =[];
    if(this.props.user.userData){
      type.forEach((item)=>{
         if(!this.props.user.userData.isAuth){
           if(item.public===true){
             list.push(item)
           }
         }else {
           if(item.name!== 'Log in'){
             list.push(item)
           }
         }
      });
    }
    return list.map((item,i)=>{
      return this.defaultlink(item,i)  
    })



  }


  render() {
    return (
      <header className='bck_b_light'>
        <div className='container'>
          <div className='left'>
            <div className='logo'>SUITING</div>
          </div>
          <div className='right'>
            <div className='top'>{this.showLinks(this.state.user)}</div>
            <div className='bottom'>{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }

}
function mapStateToProps(state){
  return {
     user: state.user
  }
} 
export default connect(mapStateToProps)(Header);
