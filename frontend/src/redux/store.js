import {  configureStore} from '@reduxjs/toolkit'
import { createOrderReducer, getAllOrdersAdmin, myOrdersReducer } from './reducers/orderReducer'
import { getAllPoducts, searchItem } from './reducers/productReducer'
import { profileReducer, userReducer } from './reducers/userReducer'






export default configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer,
        createOrder : createOrderReducer,
        myOrder : myOrdersReducer,
        searchItem : searchItem,
        getAllOrdersAdmin :getAllOrdersAdmin ,
        getAllProducts  : getAllPoducts
    }    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)


