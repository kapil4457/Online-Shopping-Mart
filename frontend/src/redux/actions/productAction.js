import axios from "axios";
import { useParams } from "react-router";
import {SEARCH_PRODUCT_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    CLEAR_ERRORS} from '../constants/productConstant'

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

export const getAllProducts = ()=>async(dispatch)=>{
        try{

            dispatch({type:GET_PRODUCTS_REQUEST});
            const {data}  =await axios.get('/api/v1/products');

            dispatch({type:GET_PRODUCTS_SUCCESS , payload:data})

        }catch(error)
        {
            dispatch({type:GET_PRODUCTS_FAIL , error : error.message})
        }
        
}


export const deleteProduct = (id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST})
        const {data} = await axios.delete(`/api/v1/admin/deleteProduct/${id}`)
        console.log("data" ,data)
        dispatch({type:DELETE_PRODUCT_SUCCESS , payload:data})

    }catch(error){
        dispatch({type:DELETE_PRODUCT_FAIL , error:error.message})
    }
}