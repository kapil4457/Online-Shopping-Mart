import axios from "axios";
import { useParams } from "react-router";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstant";
import {SEARCH_PRODUCT_FAIL,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
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

export const updateProduct=(data)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_UPDATE_REQUEST})
        const config = { headers: { "Content-Type": "application/json" } };
        
        const res = await axios.put(`/api/v1/admin/updateProduct/${data._id}` , data,config);
        dispatch({type:PRODUCT_UPDATE_SUCCESS , payload:res});
    }catch(error){
        dispatch({type:PRODUCT_UPDATE_FAIL , error : error.message})
    }
}

export const createProduct = ({data})=>async(dispatch)=>{
    try{
        console.log("In the redux : ",data.images)
        dispatch({type:CREATE_ORDER_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };
        setTimeout(async()=>{

            const res = await axios.post(`/api/v1/admin/createProduct` , data,config);
            dispatch({type:CREATE_ORDER_SUCCESS , payload:res})
        },5000)
    }catch(error){
        dispatch({type:CREATE_PRODUCT_FAIL , error:error.message})
        
    }
}