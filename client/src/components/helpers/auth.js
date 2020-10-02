import {setCookie, getCookie, removeCookie } from './cookie.js';
import {setLocalStorage, getLocalStorage, removeLocalStorage } from './localStorage.js';

export const setAuthentication = (token, user) =>{
    setCookie('token', token);
    setLocalStorage('user', user);
};

export const isAuthenticated = () =>{
    if (getCookie('token') && getLocalStorage('user')){
        return getLocalStorage('user');
    }else{
        return false;
    }
};

export const logout = (next) =>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
};