import React, { Component } from 'react';
import PageTop from '../utils/page_top'; 
import {connect} from 'react-redux';
import {getProductDetail, clearProductDetail } from '../../actions/product_actions';
import ProdInfo from './prodInfo';

 class ProdcutPage extends Component {
     componentDidMount(){
         const id = this.props.match.params.id;
        //  console.log(id)
        this.props.dispatch(getProductDetail(id))
     }
    componentWillUnmount(){
      this.props.dispatch(clearProductDetail())
    }

  render() {
    return (
      <div>
        <PageTop 
        title='Suit detail'
        />
        <div className='container'>
        {
          this.props.products.prodDetail ?
          <div className = 'product_detail_wrapper'>
          <div className='left'>
          images

          </div>
          <div className ='right'>
          <ProdInfo 
          addToCart = {(id)=>this.addToCartHandler(id)}
          detail ={this.props.products.prodDetail}
          />

          </div>

          </div>
          :'Loading'
        }
        </div>

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProdcutPage);