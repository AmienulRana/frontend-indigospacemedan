import axios from 'axios';
import { getToken, deleteToken } from '../utils/storage';
export const URL_API = 'http://localhost:5000';

export const checkExpireToken = (response) => {
    if(response.error && !response.auth){
        deleteToken();
       return window.location.href = '/login'
    }
    return true;
}
const ServiceEvent = async (method,path,data) => {
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
export const getEvent = () => {
    return ServiceEvent('get', 'event', {})
}
export const addEvent = (data) => {
    return ServiceEvent('post', 'event', data)
}
export default ServiceEvent;