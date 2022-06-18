import axios from 'axios';
import { getToken, deleteToken } from '../utils/storage';
export const URL_API = 'http://localhost:5000';
// export const checkExpireToken = (response) => {
//     if(!response.auth){
//         deleteToken();
//        return window.location.href = '/login'
//     }
//     return true;
// }
const serviceLogin = async (data) => {
    const response = await axios({
        url: `${URL_API}/login`,
        method: 'post',
        data: {...data}
    })
    if(response && response.data){
        return response.data
    }

}
export default serviceLogin;