import {  configureStore} from '@reduxjs/toolkit'
import { profileReducer, userReducer } from './reducers/userReducer'







export default configureStore({
    reducer:{
        user : userReducer,
        profile : profileReducer
    }    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)


