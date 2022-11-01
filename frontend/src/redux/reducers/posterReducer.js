import {CLEAR_ERRORS, CREATE_POSTER_FAIL,CREATE_POSTER_REQUEST,CREATE_POSTER_SUCCESS ,GET_POSTER_FAIL,GET_POSTER_REQUEST,GET_POSTER_SUCCESS} from '../constants/posterConstant'


export const createPoster = (state={} , action)=>{
    switch(action.type){
        case CREATE_POSTER_REQUEST :
            return{
                loading:true,
                ...state,
            }
        
        case CREATE_POSTER_SUCCESS :
            return{
                loading:false,
                poster : action.payload
            }
        
            case CREATE_POSTER_FAIL :
                return{
                    loading:false,
                    error : action.payload
                }
        
                case CLEAR_ERRORS :
            return{
                loading:false,
                poster : action.payload
            }

        default: 
        return state
    }
}

export const getPoster = (state={} , action)=>{
    switch(action.type){
        case GET_POSTER_REQUEST:
            return{
                loading:true,
                ...state
            }
        
        case GET_POSTER_SUCCESS:
            return{
                loading:false,
                poster : action.payload
            }
        
        case GET_POSTER_FAIL :
            return{
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return{
                loading:false,
                error:null
            }
        default:
            return state
    }
}