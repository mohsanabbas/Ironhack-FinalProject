
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS, 
    GET_DETAILS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT
} from '../actions/types';

export default function(state={},action){
    switch(action.type){
      case GET_PRODUCTS_BY_SELL:
      return {...state, bySell:action.payload}
      case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
      case GET_BRANDS:
      return {...state, brands: action.payload } 
      case GET_DETAILS:
      return {...state, detail: action.payload } 
      case GET_PRODUCTS_TO_SHOP:
      return {
          ...state,
          toShop: action.payload.articles,
          toShopSize: action.payload.size

    }
    case ADD_PRODUCT:
            return {...state,addProduct: action.payload}
        case CLEAR_PRODUCT:
            return {...state,addProduct: action.payload}

        default:
            return state;
    }
}