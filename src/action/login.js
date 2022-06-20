import axios from 'axios';
import { URL_API } from '../utils/fetch';

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