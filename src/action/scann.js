import { ServiceApi } from '../utils/fetch';
export const serviceScann = (data) => {
    return ServiceApi('post', 'scann', data)
}