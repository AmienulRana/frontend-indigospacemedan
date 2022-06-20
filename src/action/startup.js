import { ServiceApi } from '../utils/fetch';
export const getStartup = (eventId) => {
    return ServiceApi('get', `${eventId}/startup`, {})
}
export const addStartup = (eventId, data) => {
    return ServiceApi('post', `${eventId}/startup`, data)
}
export const deleteStartup = (id) => {
    return ServiceApi('delete', `startup/${id}`, {})
}
export const detailStartup = (id) => {
    return ServiceApi('get', `startup/${id}`, {})
}