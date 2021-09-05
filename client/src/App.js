/*Основной копонент нашего приложения*/
//npm start запуск приложения
import React, {useContext, useEffect, useState} from 'react'

import {BrowserRouter} from 'react-router-dom'

import NavBar from "./components/NavBar";
import {Context} from "./index";
import {refresh} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import {Spinner, Container} from "react-bootstrap";
import AppRouter from "./components/AppRouter";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            refresh().then(data => {
                user.SetUser(true)
                user.setIsAuth(true)
            })
        }
        setLoading(false)
    }, [])

    if (loading) {
        return <Container className={'align-content-lg-center'}>
            <Spinner
                animation={"border"}
                className={''}
            />
        </Container>
    }
        return(
            //Все приложение оборачиваем в BrowserRouter что бы была возможна навигация по страницам
            <BrowserRouter>
                {/*Проверяем если пользователь не авторизован то не отрисовываем панель навигации, отрисовываем пустой div  */}
                {user.isAuth ?
                    <NavBar/>
                    :
                    <div></div>
                }
                {/*Добавляем AppRouter который мы создали*/}
            <AppRouter/>
            </BrowserRouter>
        )
    }
)

export default App