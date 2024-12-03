import axios from 'axios';
import {
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
    bookhouseRequest,
    bookhouseSuccess,
    bookhouseFailure,
    changepasswordFailure,
    changepasswordRequest,
    changepasswordSuccess,
    logoutFailure,
    logoutRequest,
    logoutSuccess,
    dashboardFailure,
    dashboardRequest,
    dashboardSuccess
} from '../Slice/Rental';
import { toast } from 'react-toastify';

export const register = (data) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const response = await axios.post('http://localhost:4000/api/rental/register', data);
        dispatch(registerSuccess(response.data));
        response.data.message.forEach((mes) => toast.success(mes));
        window.location.href = '/login';
    } catch (error) {
        dispatch(registerFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const Login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axios.post('/api/rental/login', { email, password });
        console.log(response, 'response');
        dispatch(loginSuccess(response.data));
        sessionStorage.setItem('rentals', JSON.stringify(response.data.data));
        response.data.message.forEach((mes) => toast.success(mes));
        window.location.href = '/rents/dashboard';
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(loginFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const Profile = (id) => async (dispatch) => {
    try {
        dispatch(profileRequest());
        const response = await axios.get(`/api/rental/profile/${id}`);
        dispatch(profileSuccess(response.data));
    } catch (error) {
        dispatch(profileFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const UpdateProfile = (data, id) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const response = await axios.put(`/api/rental/updateprofile/${id}`, data);
        dispatch(updateProfileSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rent/dashboard';
    } catch (error) {
        dispatch(updateProfileFailure(error.message));
        toast.error(error.message);
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const AddHouse = (data, id) => async (dispatch) => {
    try {
        dispatch(addhouseRequest());
        const response = await axios.post(`/api/rental/addhouse/${id}`, data);
        dispatch(addhouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        dispatch(addhouseFailure(error.message));
        console.log(error.response.data.message.map((err) => err));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const GetHouse = (id) => async (dispatch) => {
    try {
        dispatch(houseRequest());
        const response = await axios.get(`/api/rental/houses/${id}`);
        dispatch(houseSuccess(response.data));
    } catch (error) {
        dispatch(houseFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const HouseDetail = (id) => async (dispatch) => {
    try {
        dispatch(houseDetailRequest());
        const response = await axios.get(`/api/rental/housedetail/${id}`);
        dispatch(houseDetailSuccess(response.data));
    } catch (error) {
        dispatch(houseDetailFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const UpdateHouse = (data, id) => async (dispatch) => {
    try {
        dispatch(updatehouseRequest());
        const response = await axios.put(`/api/rental/house/${id}`, data);
        dispatch(updatehouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        dispatch(updatehouseFailure(error.message));
        toast.error(error.message);
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const DeleteHouse = (id) => async (dispatch) => {
    try {
        dispatch(deletehouseRequest());
        const response = await axios.delete(`/api/rental/deletehouse/${id}`);
        dispatch(deletehouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/viewhouse';
    } catch (error) {
        dispatch(deletehouseFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const bookHouse = (id) => async (dispatch) => {
    try {
        dispatch(bookhouseRequest());
        const response = await axios.get(`/api/rental/booking/${id}`);
        dispatch(bookhouseSuccess(response.data));
        toast.success(response.data.message);
    } catch (error) {
        dispatch(bookhouseFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const ChangePassword = (id, data) => async (dispatch) => {
    try {
        dispatch(changepasswordRequest());
        const response = await axios.put(`/api/rental/changepassword/${id}`, data);
        dispatch(changepasswordSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        dispatch(changepasswordFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const response = await axios.delete('/api/rental/logout');
        dispatch(logoutSuccess(response.data));
        console.log(response.data.message, 'message');
        response.data.message.forEach((mes) => {
            toast.success(mes);
        });
        sessionStorage.removeItem('rentals');
        window.location.href = '/';
    } catch (error) {
        console.log(error.message);
        dispatch(logoutFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};

export const dashboardss = (id) => async (dispatch) => {
    try {
        dispatch(dashboardRequest());
        const response = await axios.get(`/api/rental/dashboard/${id}`);
        dispatch(dashboardSuccess(response.data));
    } catch (error) {
        dispatch(dashboardFailure(error.message));
        error.response.data.message.forEach((err) => toast.error(err));
    }
};
