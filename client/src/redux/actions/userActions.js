import ACTIONS from "."
import axios from 'axios'

export const dispatchLogin = () =>{
    return {
        type:ACTIONS.LOGIN
    };
};

export const dispatchLogout = () => {
    return {
        type:ACTIONS.LOGOUT
    };
};

export const dispatchAccessToken = (accessToken) =>{
    return {
        type:ACTIONS.GETTOKEN,
        payload:accessToken,
    };
};

export const dispatchUserAuth = (userData) => {
    return {
        type:ACTIONS.USERAUTH,
        payload:userData,
    };
};

export const dispatchUserDetailsData = (payload) => {
    return {
        type:ACTIONS.USERDETAILS,
        payload:payload,
    };
};

export const dispatchUserPersonalTasksData = (payload) => {
    return {
        type:ACTIONS.USERPERSONALTASKS,
        payload:payload,
    };
};

export const fetchUserInfo = async (token) => {

    const resp = await axios.get('/api/userinfo', {
      headers: { Authorization: token }
    })
    return resp;
};

export const fetchUserDetails = async (userDetailsId) => {

    const resp = await axios.get(`/api/userdetails/${userDetailsId}`);

    return resp;
};

export const fetchUserPersonalTasks = async (userPersonalTasksId) => {

    const resp = await axios.get(`/api/personaltasks/${userPersonalTasksId}`);

    return resp;
};