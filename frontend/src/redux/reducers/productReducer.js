import {
    SEARCH_PRODUCT_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_REQUEST,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS
} from '../constants/productConstant'




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

export const getAllPoducts = (state={} , action)=>{
    switch(action.type){
        case GET_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        
            case GET_PRODUCTS_SUCCESS :
                return{
                    loading:false,
                    products : action.payload
                }
            
        case GET_PRODUCTS_FAIL : 
        return{
            loading:false,
            error:action.payload,
        }

        case CLEAR_ERRORS :
            return{
                loading : false,
                error:null
            }
         default :
            return {
                ...state
            }
    }
}


export const deleteProduct = (state={} , action)=>{
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,
            }
        
            case DELETE_PRODUCT_SUCCESS :
                return{
                    loading:false,
                    products : action.payload
                }
            
        case DELETE_PRODUCT_FAIL : 
        return{
            loading:false,
            error:action.payload,
        }

        case CLEAR_ERRORS :
            return{
                loading : false,
                error:null
            }
         default :
            return {
                ...state
            }
    }
}