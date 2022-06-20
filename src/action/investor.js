import { ServiceApi } from '../utils/fetch';
export const getInvestor = (eventId) => {
    return ServiceApi('get', `${eventId}/investor`, {})
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