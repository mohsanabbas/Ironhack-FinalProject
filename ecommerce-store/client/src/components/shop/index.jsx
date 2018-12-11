import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import { getBrands, getDetails } from '../../actions/product_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';
import {color} from  '../utils/Form/color.js';

class Shop extends Component {
    state = {
        grid: '',
        limit: 6,
        skip:0,
        filters:{
            brand:[],
            detail:[],
            color:[],
            price:[]
        }
     }


  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getDetails());
  }
  handleFilters = (filters, category) => {
    //   console.log(filters);
    const newFilters = {...this.state.filters}
    newFilters[category] =filters;

    this.setState({
        filters: newFilters
    })

  }

  render() {
    //   console.log(this.state.filters);
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
            <CollapseCheckbox
            initState = {false} 
            title = 'color'
            list ={color}
            handleFilters = {(filters)=> this.handleFilters(filters,'color')}
            
            />
            <CollapseCheckbox
            initState = {true} 
            title = 'Fits'
            list ={products.detail}
            handleFilters = {(filters)=> this.handleFilters(filters,'details')}
            
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
