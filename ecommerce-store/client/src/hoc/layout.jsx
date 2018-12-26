import React, { Component } from 'react';
import Header from '../components/header_footer/header/index';
import Footer from '../components/header_footer/footer/index';
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site_action';

class Layout extends Component {

  componentDidMount(){
    if(Object.keys(this.props.site).length === 0){
        this.props.dispatch(getSiteData());
    }
}

  render() {
    return (
      <div>
          <Header />
          <div className='page_container'>
          {this.props.children}
          </div>
          <Footer data={this.props.site}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      site: state.site
  }
}

export default connect(mapStateToProps)(Layout);
