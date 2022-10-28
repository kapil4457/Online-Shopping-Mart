import axios from 'axios'
import {
LOGIN_FAIL,
LOGIN_REQUEST,
LOGIN_SUCCESS,
CLEAR_ERRORS,
LOAD_REQUEST,
LOAD_SUCCESS,
LOAD_FAIL,
LOGOUT_SUCCESS,
LOGOUT_FAIL,
REGISTER_SUCCESS,
REGISTER_FAIL,
REGISTER_REQUEST,
UPDATE_FAIL,
UPDATE_REQUEST,
UPDATE_SUCCESS,
UPDATE_PASSWORD_FAIL,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_REQUEST
}from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			`/api/v1/login`,
			{ email, password },
			config
		);

		await dispatch({ type: LOGIN_SUCCESS, payload: data.user });
	} catch (error) {
		await dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};


//Used to nullify the errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};




export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_REQUEST });

		const { data } = await axios.get(`/api/v1/me`);
    		dispatch({
			type: LOAD_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({ type: LOAD_FAIL, payload: error.response.data.message });
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.post(`/api/v1/logout`);
		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
	}
};


export const register = (userData) => async (dispatch) => {
	try {
		
		await dispatch({ type: REGISTER_REQUEST });
	
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.post(`/api/v1/register`, userData, config);
		await dispatch({ type: REGISTER_SUCCESS ,payload : data.user});
	} catch (error) {
		await dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
	}
};


export const updateProfile = (userData) => async (dispatch) => {
	try {
		
		await dispatch({ type: UPDATE_REQUEST });
	
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.put(`/api/v1/me/update`, userData, config);
		await dispatch({ type: UPDATE_SUCCESS ,payload : data.user});
	} catch (error) {
		await dispatch({ type: UPDATE_FAIL, payload: error.response.data.message });
	}
};


export const updatePassword = (userData) => async (dispatch) => {
	try {
		
		await dispatch({ type: UPDATE_PASSWORD_REQUEST });
	
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.put(`/api/v1/me/updatePassword`, userData, config);
		await dispatch({ type: UPDATE_PASSWORD_SUCCESS ,payload : data.user});
	} catch (error) {
		await dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
	}
};