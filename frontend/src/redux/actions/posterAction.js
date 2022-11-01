import axios from 'axios';
import {CLEAR_ERRORS, CREATE_POSTER_FAIL,CREATE_POSTER_REQUEST,CREATE_POSTER_SUCCESS , GET_POSTER_FAIL,GET_POSTER_REQUEST,GET_POSTER_SUCCESS} from '../constants/posterConstant'


export const createPoster=(info)=>async(dispatch)=>{

    try{
        dispatch({type:CREATE_POSTER_REQUEST})
        const config = { headers: { "Content-Type": "application/json" } };
        setTimeout(async()=>{

            const {data} =await axios.post('/api/v1/poster/create',info,config);
            dispatch({type:CREATE_POSTER_SUCCESS , payload : data});
        },3000)
        
    }catch(error){
        
        dispatch({type:CREATE_POSTER_FAIL , payload : error});
    }
}


export const getLatestPoster = ()=> async (dispatch) => {
    try{
        await dispatch({type : GET_POSTER_REQUEST});
        const {data} = await axios.get('/api/v1/admin/latest/poster');
        
            await dispatch({type:GET_POSTER_SUCCESS , payload : data});

    }catch(error){
       await  dispatch({type:GET_POSTER_FAIL ,payload:error})
    }
}


export const clearErrors = () => async (dispatch) => {

	dispatch({
		type: CLEAR_ERRORS,
	});
    
};