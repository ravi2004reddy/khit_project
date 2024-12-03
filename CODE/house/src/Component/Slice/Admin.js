import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
    },
    reducers: {
        loginRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        loginSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        loginFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewrentalRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewrentalSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                users: actions.payload.data,
            };
        },
        viewrentalFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updaterentalRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        updaterentalSuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        updaterentalFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewcustomerRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewcustomerSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                userss: actions.payload.data,
            };
        },
        viewcustomerFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        logoutrequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        logoutsuccess: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        logoutfailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        viewHouseRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        viewHouseSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                adminhouses: actions.payload.data,
            };
        },
        viewHouseFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        },
        dashboardRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        dashboardSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                dashboard: actions.payload,
            };
        },
        dashboardFailure: (state) => {
            return {
                ...state,
                loading: false,
            };
        }
    },
});

const { reducer, actions } = adminSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    viewrentalRequest,
    viewrentalSuccess,
    viewrentalFailure,
    updaterentalRequest,
    updaterentalSuccess,
    updaterentalFailure,
    viewcustomerRequest,
    viewcustomerSuccess,
    viewcustomerFailure,
    logoutrequest,
    logoutsuccess,
    logoutfailure,
    viewHouseRequest,
    viewHouseFailure,
    viewHouseSuccess,
    dashboardFailure,
    dashboardRequest,
    dashboardSuccess
} = actions;

export default reducer;
