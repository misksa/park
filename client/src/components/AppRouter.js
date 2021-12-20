/*В этом файле реализуем навигацию по страницам, тут будет описана логика навигации по страницам*/

import React, {useContext} from 'react';

//Импортируем компоненты Switch Route Redirect из установленного пакета react-router-dom
import {Switch, Route, Redirect} from 'react-router-dom'

//импортируем массив с путями для авторизированных пользователей импортируем массив с путями для всех пользователей
import {authRoutes, publicRoutes} from "../routes";

import {Context} from "../index";

import {LOGIN_ROUTE, PARK_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {

    //получаем переменную isAuth из UserPark
    //Делаем деструктуризацию, вызываем хук useContext и туда передаем тот контекст который создавали
    const {user} = useContext(Context)

    return (
        <>
            {user.isAuth ?
                <Switch>
                    {authRoutes.map(({path, component})=>
                    <Route key={path} path={path} component={component} />)
                    }
                    <Redirect to={PARK_ROUTE}/>
                </Switch>
                :
                <Switch>
                    {publicRoutes.map(({path, component})=>
                        <Route key={path} path={path} component={component} />)
                    }
                    <Redirect to={LOGIN_ROUTE}/>
                </Switch>
            }
        </>

    )
})
export default AppRouter;