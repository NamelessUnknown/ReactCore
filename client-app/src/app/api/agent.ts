import { IActivity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';
import { history } from '../..'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
    if(error.message === 'Network Error' && !error.response)
    {
        toast.error('Network error - you probably forgot to run the API, dipshit')
    }
    const {status, data, config} = error.response;
    if(error.response.status === 404)
    {
        history.push('/notfound');
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
    {
        history.push('/notFound');
    }
    if(status === 500)
    {
        toast.error('Server error - check the terminal for more info!');
    }
    throw error;
})

const responseBody = (response:AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url:string) => axios.get(url).then(sleep(2000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(2000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(2000)).then(responseBody),
    delete:(url: string) => axios.delete(url).then(sleep(2000)).then(responseBody)
}

const Activities = {
    list:(): Promise<IActivity[]> => requests.get('/activities'),
    details: (id:string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id:string) => requests.delete(`/activities/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Activities
}