import axios from 'axios';
import {
CREATE_ORDER_FAIL,
CREATE_ORDER_REQUEST,
CREATE_ORDER_SUCCESS,
MY_ORDERS_FAIL,
MY_ORDERS_REQUEST,
MY_ORDERS_SUCCESS,
ORDER_DETAILS_FAIL,
ORDER_DETAILS_REQUEST,
ORDER_DETAILS_SUCCESS,
CLEAR_ERRORS,
ORDER_CANCEL_FAIL,
ORDER_CANCEL_REQUEST,
ORDER_CANCEL_SUCCESS,
GET_ALL_ORDERS_ADMIN_FAIL,
GET_ALL_ORDERS_ADMIN_REQUEST,
GET_ALL_ORDERS_ADMIN_SUCCESS,
UPDATE_ORDER_STATUS_FAIL,
UPDATE_ORDER_STATUS_REQUEST,
UPDATE_ORDER_STATUS_SUCCESS
} from '../constants/orderConstant'


export const createOrder = (order) => async (dispatch) => {
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post("/api/v1/order/new", order, config);
		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};



//My Orders
export const myOrders = () => async (dispatch) => {
	try {
		dispatch({
			type: MY_ORDERS_REQUEST,
		});

		const { data } = await axios.get("/api/v1/orders/me");
		dispatch({
			type: MY_ORDERS_SUCCESS,
			payload: data.orders,
		});
	} catch (error) {
		dispatch({
			type: MY_ORDERS_FAIL,
			payload: error.response.data.message,
		});
	}
};


//Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		const { data } = await axios.get(`/api/v1/order/${id}`);
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data.order,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const cancelOrder = (id)=>async(dispatch)=>{
dispatch({
    type:ORDER_CANCEL_REQUEST
})

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

const {data} = axios.put('/api/v1/order/cancel' , {id} , config);
try{

    dispatch({
        type:ORDER_CANCEL_SUCCESS,
        payload:data,
    })
}catch(error){
    dispatch({
        type:ORDER_CANCEL_FAIL,
        payload:error.response.data.message
    })
}



}

//Used to nullify the errors
export const clearErrors = () => async (dispatch) => {

	dispatch({
		type: CLEAR_ERRORS,
	});
    
};


// Get all Orders (Admin)

export const getAllOrder = () => async (dispatch)=>{
	try{

		dispatch({type: GET_ALL_ORDERS_ADMIN_REQUEST})
		
		const {data} = await axios.get('/api/v1/admin/orders');
		dispatch({type:GET_ALL_ORDERS_ADMIN_SUCCESS ,payload:data})
	}catch(error){
		dispatch({type:GET_ALL_ORDERS_ADMIN_FAIL ,payload:error.response.data.message}) ;
	}
	
	
}

export const updateOrderStatus = (newStatusInfo)=>async(dispatch)=>{
	try{
		await dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
		const config = {headers: {'Content-Type': 'application/json	'}};
		setTimeout(async()=>{

			const {data} = await axios.put(`/api/v1/admin/order/${newStatusInfo?.id}` , newStatusInfo , config)
			await dispatch({type:UPDATE_ORDER_STATUS_SUCCESS , payload : data});
		},3000)
			
	}catch(error){
		
		await dispatch({type:UPDATE_ORDER_STATUS_FAIL ,payload:error.response.data.message}) ;
	}
}