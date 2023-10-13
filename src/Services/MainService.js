
import axios from 'axios';
import { handleError } from '../utils/Sweetalert';
var auth = false;
var token = localStorage.getItem('user');
var refreshToken = localStorage.getItem('refresh_token');
export const ApiService = async () => {
    try {
        await axios.post(`https://localhost:44323/api/Register/Main`,
            {
                'AccessToken': token,
                'RefreshToken': refreshToken
            },
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('user', res.data.accessToken)
                    localStorage.setItem('refresh_token', res.data.refreshToken)
                    auth = true
                }
            })
    } catch (e) {
         if (e.status === 401) {
        handleError('Please be logout and try again later..')
    }
    }
    finally {
        if (auth) {
            return auth;
        }
        else {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('refreshTokenExpiry');
            localStorage.removeItem('roleId');
            localStorage.removeItem('login');
            document.location = '#/Login'
            handleError("Your login time is Expired");
            return null;
        }
    }
}

export const GetMethod = async (url) => {
    await ApiService();
    if (auth) {
        let service = await axios.create({
            baseURL: 'https://localhost:44323/api/',
            headers: { csrf: 'token', 'Access-Control-Allow-Origin': '*' },
            responseType: 'json'
        });
        return await service.request({
            method: 'GET',
            url: url,
            headers: { 'Authorization': 'Bearer ' + token }
        })
    }
}

export const GetBlobMethod = async (url) => {
    await ApiService();
    if (auth) {
        let service = await axios.create({
            baseURL: 'https://localhost:44323/api/',
            headers: { csrf: 'token', 'Access-Control-Allow-Origin': '*' },
            responseType: 'json'
        });
        return await service.request({
            method: 'GET',
            url: url,
            responseType: 'blob',
            headers: { 'Authorization': 'Bearer ' + token }
        })
    }
}

export const PostMethod = async (url, data) => {
    await ApiService();
    if (auth) {
        let service = await axios.create({
            baseURL: 'https://localhost:44323/api/',
            headers: { csrf: 'token', 'Access-Control-Allow-Origin': '*' },
            responseType: 'json'
        });
        return await service.request({
            method: 'POST',
            url: url,
            data: data,
            headers: { 'Authorization': 'Bearer ' + token }
        })
    }
}

export const PutMethod = async (url, data) => {
    await ApiService();
    if (auth) {
        let service = await axios.create({
            baseURL: 'https://localhost:44323/api/',
            headers: { csrf: 'token', 'Access-Control-Allow-Origin': '*' },
            responseType: 'json'
        });
        return await service.request({
            method: 'PUT',
            url: url,
            data: data,
            headers: { 'Authorization': 'Bearer ' + token }
        })
    }
}
