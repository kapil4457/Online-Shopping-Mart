import {  configureStore} from '@reduxjs/toolkit'
import { createOrderReducer, myOrdersReducer } from './reducers/orderReducer'
import { profileReducer, userReducer } from './reducers/userReducer'






export default configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer,
        createOrder : createOrderReducer,
        myOrder : myOrdersReducer
    }    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)


