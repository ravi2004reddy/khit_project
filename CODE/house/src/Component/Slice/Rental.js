import { createSlice } from "@reduxjs/toolkit";



const RentalSlice = createSlice({
    name: "Rental",
    initialState: {
        loading: false,
    },
    reducers: {
        registerRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        registerSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        registerFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        loginRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        loginSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        loginFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        profileRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        profileSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        profileFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        updateProfileRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        updateProfileSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        updateProfileFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        houseRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        houseSuccess: (state,actions) => {
            return{
                ...state,
                loading:false,
                houses: actions.payload.data
            }
        },
        houseFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        houseDetailRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        houseDetailSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        houseDetailFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        addhouseRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        addhouseSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        addhouseFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        updatehouseRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        updatehouseSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        updatehouseFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        deletehouseRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        deletehouseSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        deletehouseFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        searchRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        searchSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        searchFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        bookhouseRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        bookhouseSuccess: (state,actions) => {
         
            return{
                ...state,
                loading:false,
                bookings: actions.payload.data
            }
        },
        bookhouseFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        changepasswordRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        changepasswordSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        changepasswordFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        logoutRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        logoutSuccess: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        logoutFailure: (state) => {
            return{
                ...state,
                loading:false
            }
        },
        dashboardRequest: (state) => {
            return{
                ...state,
                loading:true
            }
        },
        dashboardSuccess: (state,actions) => {
            return{
                ...state,
                loading:false,
                dashboard: actions.payload.data
            }
        },
        dashboardFailure: (state) => {
            return{
                ...state,
                loading:false,
            }
        }

       
    },
    });



    const { actions, reducer } = RentalSlice;


   export  const {
        registerRequest,
        registerSuccess,
        registerFailure,
        loginRequest,
        loginSuccess,
        loginFailure,
        profileRequest,
        profileSuccess,
        profileFailure,
        updateProfileRequest,
        updateProfileSuccess,
        updateProfileFailure,
        houseRequest,
        houseSuccess,
        houseFailure,
        houseDetailRequest,
        houseDetailSuccess,
        houseDetailFailure,
        addhouseRequest,
        addhouseSuccess,
        addhouseFailure,
        updatehouseRequest,
        updatehouseSuccess,
        updatehouseFailure,
        deletehouseRequest,
        deletehouseSuccess,
        deletehouseFailure,
        searchRequest,
        searchSuccess,
        searchFailure,
        bookhouseRequest,
        bookhouseSuccess,
        bookhouseFailure,
        changepasswordRequest,
        changepasswordSuccess,
        changepasswordFailure,
        logoutRequest,
        logoutSuccess,
        logoutFailure,
        dashboardRequest,
        dashboardSuccess,
        dashboardFailure
    } = actions;


    export default reducer;