import {$host} from "./index";
import axios from "axios";
import notice from "../utils/notice";



export const registration = async (User) => {
    const {data} = await $host.post('api/user/registration', User)
    if(data.status === 204 || data.status === 404) {
        notice.Error(data.message)
        return false
    } else if( data.status === 200) {
        notice.Success(data.message)
    }
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $host.post('api/user/delete', id)
    if(data.status === 204 || data.status === 404) {
        notice.Error(data.message)
        return false
    } else if( data.status === 200) {
        notice.Success(data.message)
    }
    return data
}

export const Login = async (login, password) => {
    const data = await $host.post('api/user/login', {login, password})
    //Добавление токена в файле Login.js
    // localStorage.setItem('accessToken', data.accessToken)
    return data
}

export const Logout = async () => {
    const {data} = await $host.post('api/user/logout')
    localStorage.removeItem('accessToken')
    return {data}
}


export const refresh = async () => {
        const {data} = await axios.get(`http://localhost:5000/api/user/refresh`, {withCredentials: true})
        localStorage.setItem('accessToken', data.accessToken)
        return {data}
}
//Получение пользователей
export const fetchUser = async () => {
    const {data} = await $host.get('api/user')
    return data
}