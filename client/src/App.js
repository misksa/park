/*Основной копонент нашего приложения*/
//npm start запуск приложения
import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import NavBar from "./components/NavBar";
import {Context} from "./index";
import {fetchUser, refresh} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Pending from "./components/Notice/Pending/Pending";
import {
    fetchAuthOffice,
    fetchCount,
    fetchMessage,
    fetchPlace,
    fetchPublicOffice, fetchSubtype,
    fetchType
} from "./http/parkAPI";
import Loader from "./components/Loader/Loader";

const App = observer(() => {
    const {user} = useContext(Context)
    const {park} = useContext(Context)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            refresh().then(({data}) => {
                user.SetUser(data.User)
                user.setIsAuth(true)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [user])


    if (loading) {
        return (
            <Loader/>
        )
    }

        return(
            //Все приложение оборачиваем в BrowserRouter что бы была возможна навигация по страницам
            <BrowserRouter>
                {/*Проверяем если пользователь не авторизован то не отрисовываем панель навигации, отрисовываем пустой div  */}
                {user.isAuth &&
                    <NavBar/>
                }
                {/*Добавляем AppRouter который мы создали*/}
            <AppRouter/>
                <Pending/>
            <ToastContainer
                theme={'colored'}
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            </BrowserRouter>
        )
    }
)

export default App