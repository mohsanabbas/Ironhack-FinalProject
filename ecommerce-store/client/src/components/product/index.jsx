import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import ProdImg from './prodImg';
import { addToCart } from '../../actions/user_actions';
import {
  getProductDetail,
  clearProductDetail
} from '../../actions/product_actions';
import ProdInfo from './prodInfo';

class ProdcutPage extends Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response=>{
        if(!this.props.products.prodDetail){
            this.props.history.push('/');
        }
    })
}
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler(id){
    // console.log(id)
    this.props.dispatch(addToCart(id))

  }



  render() {
    return (
      <div>
        <PageTop title="Suit detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
              <div style={{width:'500px'}}>
              <ProdImg 
              detail={this.props.products.prodDetail}
              />
              
              </div>
              </div>
              <div className="right">
                <ProdInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                />
              </div>
            </div>
          ) : (
            'Loading'
          )}
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

export default connect(mapStateToProps)(ProdcutPage);
