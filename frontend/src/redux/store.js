import {  configureStore} from '@reduxjs/toolkit'
import { deleteProduct } from './actions/productAction'
import { createOrderReducer, getAllOrdersAdmin, myOrdersReducer } from './reducers/orderReducer'
import { createProduct, getAllPoducts, searchItem, updateProduct } from './reducers/productReducer'
import { profileReducer, userReducer } from './reducers/userReducer'






export default configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer,
        createOrder : createOrderReducer,
        myOrder : myOrdersReducer,
        searchItem : searchItem,
        getAllOrdersAdmin :getAllOrdersAdmin ,
        getAllProducts  : getAllPoducts,
        deleteProduct : deleteProduct,
        updateProduct : updateProduct,
        createOrder : createProduct
    }    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)


