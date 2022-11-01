import axios from 'axios';
import {CREATE_POSTER_FAIL,CREATE_POSTER_REQUEST,CREATE_POSTER_SUCCESS} from '../constants/posterConstant'


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