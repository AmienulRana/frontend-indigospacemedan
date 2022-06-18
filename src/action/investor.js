import { ServiceApi } from '../utils/fetch';
export const getInvestor = () => {
    return ServiceApi('get', 'investor', {})
}
export const addInvestor = (eventId, data) => {
    return ServiceApi('post', `${eventId}/investor`, data)
}
export const deleteInvestor = (id) => {
    return ServiceApi('delete', `investor/${id}`, {})
}
export const detailInvestor = (id) => {
    return ServiceApi('get', `investor/${id}`, {})
}