import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

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
    if (typeof window !== 'object')
    {
        return 'No data';
    }
    const token = localStorage.getItem('token');
    const jwtClaims = decodeJWT(token);
    return jwtClaims;
}

export const getUserInfo = () => {
    const userInfo = {
        firstName: localStorage.getItem('first_name'),
        lastName: localStorage.getItem('last_name'),
        group: localStorage.getItem('group'),
    }
    return userInfo;
}