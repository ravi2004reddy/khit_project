import axios from "axios";
import {
    registerRequest, registerSuccess, registerFailure, loginRequest, loginSuccess, loginFailure,
    profileRequest, profileSuccess, profileFailure, viewHouseRequest, viewHouseSuccess, viewHouseFailure,
    updateProfileRequest, updateProfileSuccess, updateProfileFailure, viewhousedetailsRequest,
    viewhousedetailsSuccess, viewhousedetailsFailure, bookHouseRequest, bookHouseSuccess, bookHouseFailure,
    viewBookingRequest, viewBookingSuccess, viewBookingFailure, logoutRequest, logoutSuccess, logoutFailure,
    changepasswordFailure, changepasswordRequest, changepasswordSuccess, searchFailure, searchRequest, searchSuccess
} from '../Slice/Customer';

import { toast } from "react-toastify";

export const register = (data) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const res = await axios.post('/api/customer/register', data);
        dispatch(registerSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(registerFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const customerlogin = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const res = await axios.post('/api/customer/login', { email, password });
        dispatch(loginSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
        sessionStorage.setItem('customer', JSON.stringify(res.data));
        window.location.href = '/homepage';
    } catch (error) {
        dispatch(loginFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const Profile = (id) => async (dispatch) => {
    try {
        dispatch(profileRequest());
        const res = await axios.get(`/api/customer/profile/${id}`);
        dispatch(profileSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(profileFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const UpdateProfile = (data, id) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const res = await axios.put(`/api/customer/updateprofile/${id}`, data);
        dispatch(updateProfileSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(updateProfileFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const ViewHouse = (city, startprice, endprice, bedrooms, facilities) => async (dispatch) => {
    try {
        dispatch(viewHouseRequest());
        const res = await axios.get(`/api/customer/viewhouse?city=${city}&startprice=${startprice}&endprice=${endprice}&bedrooms=${bedrooms}&facilities=${facilities}`);
        dispatch(viewHouseSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(viewHouseFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const ViewHouseDetails = (id) => async (dispatch) => {
    try {
        dispatch(viewhousedetailsRequest());
        const res = await axios.get(`/api/customer/viewhousedetails/${id}`);
        dispatch(viewhousedetailsSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(viewhousedetailsFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const BookHouse = (id, data) => async (dispatch) => {
    try {
        dispatch(bookHouseRequest());
        const res = await axios.post(`/api/customer/bookhouse/${id}`, {
            ...data
        });
        dispatch(bookHouseSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(bookHouseFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const changepassword = (id, data) => async (dispatch) => {
    try {
        dispatch(changepasswordRequest());
        const res = await axios.put(`/api/customer/changepassword/${id}`, data);
        dispatch(changepasswordSuccess(res.data));
        toast.success(res.data.message);
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(changepasswordFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const ViewBooking = (id) => async (dispatch) => {
    try {
        dispatch(viewBookingRequest());
        const res = await axios.get(`/api/customer/viewbooking/${id}`);
        dispatch(viewBookingSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(viewBookingFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const searchHousess = (city, startprice, endprice, bedrooms, facilities) => async (dispatch) => {
    try {
        console.log(city, startprice, endprice, bedrooms, facilities);
        dispatch(searchRequest());
        const res = await axios.get(`/api/customer/housesss?city=${city}&startprice=${startprice}&endprice=${endprice}&bedrooms=${bedrooms}&facilities=${facilities}`);
        dispatch(searchSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
    } catch (error) {
        dispatch(searchFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const res = await axios.delete('/api/customer/logout');
        dispatch(logoutSuccess(res.data));
        res.data.message.forEach((mes) => toast.success(mes));
        sessionStorage.removeItem('customer');
        window.location.href = '/';
    } catch (error) {
        dispatch(logoutFailure(error));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};
