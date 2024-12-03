import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { thunk } from "redux-thunk";
import RentalSlice from "./Component/Slice/Rental";
import CustomerSlice from "./Component/Slice/Customer";
import admin from "./Component/Slice/Admin";

// Combine reducers
const rootReducer = combineReducers({
    Rental: RentalSlice,
    Customer: CustomerSlice,
    Admin: admin,
});

// Configure the Redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Export the store
export default store;
