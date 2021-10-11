import {$host} from "./index";
import axios from "axios";

export const registration = async (User) => {
    const {data} = await $host.post('api/user/registration', User)
    return {data}
}

export const deleteUser = async (id) => {
    const {data} = await $host.post('api/user/delete', id)
    return {data}
}

export const Login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    //Добавление токена перенес в файл Login.js
    // localStorage.setItem('accessToken', data.accessToken)
    return {data}
}

export const Logout = async () => {
    const {data} = await $host.post('api/user/logout')
    localStorage.removeItem('accessToken')
    return {data}
}


export const refresh = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/refresh`, {withCredentials: true})
        console.log(data)
        localStorage.setItem('accessToken', data.accessToken)
        return {data}
}
//Получение пользователей
export const fetchUser = async () => {
    const {data} = await $host.get('api/user')
    return data
}