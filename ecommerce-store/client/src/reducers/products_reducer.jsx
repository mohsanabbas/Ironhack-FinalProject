
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS, 
    GET_DETAILS
} from '../actions/types';
import { stat } from 'fs';

export default function(state={},action){
    switch(action.type){
      case GET_PRODUCTS_BY_SELL:
      return {...state, bySell:action.payload}
      case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
      case GET_BRANDS:
      return {...state, brnads: action.payload } 
      case GET_DETAILS:
      return {...state, detail: action.payload } 

        default:
            return state;
    }
}