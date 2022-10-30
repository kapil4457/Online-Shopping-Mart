import axios from "axios";
import { useParams } from "react-router";
import {SEARCH_PRODUCT_FAIL,SEARCH_PRODUCT_REQUEST,SEARCH_PRODUCT_SUCCESS,CLEAR_ERRORS} from '../constants/productConstant'

export const searchItem = (id)=> async (dispatch) => {
    try{

        dispatch({type:SEARCH_PRODUCT_REQUEST});
        
    if(id == "new"){
        
        const {data} = await axios.get(`/api/v1/products/getLatest`);
        dispatch({type:SEARCH_PRODUCT_SUCCESS , payload:data});
    }else{
        const {data} = await axios.get(`/api/v1/products/search/${id}`);
        dispatch({type:SEARCH_PRODUCT_SUCCESS , payload:data});
    }
}catch(error){
    dispatch({type:SEARCH_PRODUCT_FAIL, error:error.message});
}
}

//Used to nullify the errors
export const clearErrors = () => async (dispatch) => {

	dispatch({
		type: CLEAR_ERRORS,
	});
    
};