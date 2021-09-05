import {$host} from "./index";
import axios from "axios";
import jwt_decode from 'jwt-decode'

export const registration = async (login, password, role) => {
    const {data} = await $host.post('api/user/registration', {login, password}, )
    return jwt_decode(data.token)
}

export const Login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const Logout = async () => {
    const {data} = await $host.post('api/user/logout')
    localStorage.removeItem('accessToken')
}


export const refresh = async () => {
        const {data} = await axios.get(`http://localhost:5000/api/user/refresh`, {withCredentials: true})
        console.log(data)
        localStorage.setItem('accessToken', data.accessToken)
        return jwt_decode(data.accessToken)
}
//Получение пользователей
export const fetchUser = async () => {
    const {data} = await $host.get('api/user')
    return data
}