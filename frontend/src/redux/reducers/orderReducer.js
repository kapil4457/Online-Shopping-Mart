import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    MY_ORDERS_FAIL,
MY_ORDERS_REQUEST,
MY_ORDERS_SUCCESS,
ORDER_DETAILS_FAIL,
ORDER_DETAILS_REQUEST,
ORDER_DETAILS_SUCCESS,
ORDER_CANCEL_FAIL,
ORDER_CANCEL_REQUEST,
ORDER_CANCEL_SUCCESS,
GET_ALL_ORDERS_ADMIN_REQUEST,
GET_ALL_ORDERS_ADMIN_SUCCESS,
GET_ALL_ORDERS_ADMIN_FAIL,
UPDATE_ORDER_STATUS_SUCCESS,
UPDATE_ORDER_STATUS_FAIL,
UPDATE_ORDER_STATUS_REQUEST
    } from '../constants/orderConstant'


    export const createOrderReducer = (state =  {} , action) => {
        switch(action.type) {
            case CREATE_ORDER_REQUEST:
                return {
                    ...state,
                    loading : true

                }
            	case CREATE_ORDER_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};

		case CREATE_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

            case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
        }
    }


    export const myOrdersReducer = (state = { orders: [] }, action) => {
        switch (action.type) {
            case MY_ORDERS_REQUEST:
                return {
                    loading: true,
                };
    
            case MY_ORDERS_SUCCESS:
                return {
                    loading: false,
                    orders: action.payload,
                };
    
            case MY_ORDERS_FAIL:
                return {
                    loading: false,
                    error: action.payload,
                };
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
    
            default:
                return state;
        }
    };


    export const orderDetailsReducer = (state = { order: {} }, action) => {
        switch (action.type) {
            case ORDER_DETAILS_REQUEST:
                return {
                    loading: true,
                };
    
            case ORDER_DETAILS_SUCCESS:
                return {
                    loading: false,
                    order: action.payload,
                };
    
            case ORDER_DETAILS_FAIL:
                return {
                    loading: false,
                    error: action.payload,
                };
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
    
            default:
                return state;
        }
    };
    export const cancelOrderReducer = (state = { order: {} }, action) => {
        switch (action.type) {
            case ORDER_CANCEL_REQUEST:
                case UPDATE_ORDER_STATUS_REQUEST:
                return {
                    loading: true,
                };
    
            case ORDER_CANCEL_SUCCESS:
                case UPDATE_ORDER_STATUS_SUCCESS:
                return {
                    loading: false,
                    order: action.payload,
                };
    
            case ORDER_CANCEL_FAIL:
                case UPDATE_ORDER_STATUS_FAIL:
                return {
                    loading: false,
                    error: action.payload,
                };
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                };
    
            default:
                return state;
        }
    };


    export const getAllOrdersAdmin = (state=[] , action)=>{
        switch(action.type){
            case  GET_ALL_ORDERS_ADMIN_REQUEST : 
                    return {
                        loading:true,
                        ...state,
                    }
            case GET_ALL_ORDERS_ADMIN_SUCCESS :
                return {
                    loading : false,
                    order : action.payload,
                }
            

            case GET_ALL_ORDERS_ADMIN_FAIL :
                return {
                    loading :false,
                    error:action.payload,
                }

            case CLEAR_ERRORS :
                return{
                    loading: false,
                    error:null,
                    ...state
                }
                default:
                    return state;

        }
    }