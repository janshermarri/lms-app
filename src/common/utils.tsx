import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { getCookie, getCookies } from 'cookies-next';

export const successToast = (text: string) => {
    toast.success(text);
}

export const errorToast = (text: string) => {
    toast.error(text);
}

export const decodeJWT = (token: string) => {
    return jwt_decode(token);
}

export const getJWTClaims = () => {
    if (typeof window !== 'object') {
        return 'No data';
    }
    const token = localStorage.getItem('token');
    const jwtClaims = decodeJWT(token);
    return jwtClaims;
}

export const getUserInfo = () => {
    const userInfo = {
        firstName: getCookie('user_first_name') ?  getCookie('user_first_name') : 'User',
        lastName: getCookie('user_last_name') ?  getCookie('user_last_name') : 'User',
        group: getCookie('user_group') ?  getCookie('user_group') : 'User',
        id: getCookie('user_id') ?  getCookie('user_id') : 99999,
    }
    return userInfo;
}