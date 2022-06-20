import axios from "axios";
import { getToken, deleteToken } from './storage';
export const URL_API = 'https://indigospacemedanapi.herokuapp.com';

export const checkExpireToken = (response) => {
    if(response.auth !== undefined && !response.auth){
        deleteToken();
       return window.location.href = '/login'
    }
    return true;
}
export const ServiceApi = async (method,path,data) => {
    const response = await axios({
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        url: `${URL_API}/${path}`,
        method: method,
        data:data,
    })
    if(response && response.data){
        if(checkExpireToken(response.data)){
            return response.data;
        }
    }
}


