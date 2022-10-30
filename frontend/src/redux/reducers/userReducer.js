
import {LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	CLEAR_ERRORS ,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOAD_FAIL,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	UPDATE_FAIL,
	UPDATE_REQUEST,
	UPDATE_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_REQUEST,
	GET_ALL_USER_SUCCESS,
	GET_ALL_USER_FAIL,
	GET_ALL_USER_REQUEST
} from '../constants/userConstants'


export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST :
          case LOAD_REQUEST:
		case REGISTER_REQUEST:
			case GET_ALL_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};

		case LOGIN_SUCCESS :
		case LOAD_SUCCESS:
			case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user : action.payload,
			};

			case GET_ALL_USER_SUCCESS:
				return{
					...state,
					loading:false,
					users: action.payload
				}
				case GET_ALL_USER_FAIL:
					return {
						loading:false,
						error: action.payload,
					}

		case LOGIN_FAIL :
		case REGISTER_FAIL:

			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

            
		case LOAD_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};



		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		case LOGOUT_SUCCESS:
				return {
					loading: false,
					user: null,
					isAuthenticated: false,
				};
	
		case LOGOUT_FAIL:
				return {
					...state,
					loading: false,
					error: action.payload,
				};

		default:
			return state;
	}
};


export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_REQUEST:
			case UPDATE_PASSWORD_REQUEST:

		
			return {
				...state,
				loading: true,
			};

		case UPDATE_SUCCESS:
			case UPDATE_PASSWORD_SUCCESS:

			return {
				...state,
				loading: false,
				isUpdated: true,
			};

	

		
		case UPDATE_FAIL:
		case UPDATE_PASSWORD_FAIL:

			return {
				...state,
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
