import {  configureStore} from '@reduxjs/toolkit'
import { createOrderReducer, myOrdersReducer } from './reducers/orderReducer'
import { searchItem } from './reducers/productReducer'
import { profileReducer, userReducer } from './reducers/userReducer'






export default configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer,
        createOrder : createOrderReducer,
        myOrder : myOrdersReducer,
        searchItem : searchItem
    }    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)


