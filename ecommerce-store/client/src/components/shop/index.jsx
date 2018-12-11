import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import {
  getBrands,
  getDetails,
  getProductsToShop
} from '../../actions/product_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';
import { color, price } from '../utils/Form/color.js';
import CollapseRadio from '../utils/collapseRadio';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      detail: [],
      color: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getDetails());
    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    //   console.log(filters);
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = (filters) => {
    this.props.dispatch(
      getProductsToShop(0, this.state.limit, filters)
    ).then(()=>{
      this.setState({
        skip:0
      })
    })
  };
  render() {
    // console.log(this.state.filters);
    const products = this.props.products;
    return (
      <div>
        <PageTop title="Search what interests you " />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="color"
                list={color}
                handleFilters={filters => this.handleFilters(filters, 'color')}
              />
              <CollapseCheckbox
                initState={false}
                title="Fits"
                list={products.detail}
                handleFilters={filters =>
                  this.handleFilters(filters, 'details')
                }
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
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
