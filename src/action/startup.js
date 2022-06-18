import { ServiceApi } from '../utils/fetch';
export const getStartup = () => {
    return ServiceApi('get', 'startup', {})
}
export const addStartup = (eventId, data) => {
    return ServiceApi('post', `${eventId}/startup`, data)
}
export const deleteStartup = (id) => {
    return ServiceApi('delete', `startup/${id}`, {})
}