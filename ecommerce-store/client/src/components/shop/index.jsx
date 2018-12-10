import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import { getBrands, getDetails } from '../../actions/product_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';

class Shop extends Component {
  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getDetails());
  }
  handleFilters = () => {

  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <PageTop title="Search what interests you " />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
            <CollapseCheckbox
            initState = {true} 
            title = 'brands'
            list ={products.brands}
            handleFilters = {(filters)=> this.handleFilters(filters,'brand')}
            
            />
            
            
            </div>
            <div className="right">rigth</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Shop);
