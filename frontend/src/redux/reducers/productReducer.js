import {SEARCH_PRODUCT_FAIL,SEARCH_PRODUCT_REQUEST,SEARCH_PRODUCT_SUCCESS,CLEAR_ERRORS} from '../constants/productConstant'




export const searchItem = (state = {} , action)=>{
    switch(action.type){

        case SEARCH_PRODUCT_REQUEST :
            return{
                ...state,
                loading:true,
                
            }
        case SEARCH_PRODUCT_SUCCESS :
            return{
                loading :false,
                products : action.payload
            }
        case SEARCH_PRODUCT_FAIL :
            return {
                loading:false,
                error : action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
    
            default:
                return state;
            }

    
}