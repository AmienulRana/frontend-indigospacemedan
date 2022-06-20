import { ServiceApi } from '../utils/fetch';
export const getEvent = () => {
    return ServiceApi('get', 'event', {})
}
export const detailEvent = (id) => {
    return ServiceApi('get', `event/${id}`, {})
}
export const addEvent = (data) => {
    return ServiceApi('post', 'event', data)
}
export const deleteEvent = (id) => {
    return ServiceApi('delete', `event/${id}`, {})
}