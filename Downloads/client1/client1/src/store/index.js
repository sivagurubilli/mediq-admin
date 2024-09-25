import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import layoutReducer from "./slices/layout"
import listingReducer from "./slices/listing"


const reducer = {
    auth: authReducer,
    listing:listingReducer,
    layout: layoutReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;