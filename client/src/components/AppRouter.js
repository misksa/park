/*В этом файле реализуем навигацию по страницам, тут будет описана логика навигации по страницам*/

import React, {useContext} from 'react';

//Импортируем компоненты Switch Route Redirect из установленного пакета react-router-dom
import {Switch, Route, Redirect} from 'react-router-dom'

//импортируем массив с путями для авторизированных пользователей импортируем массив с путями для всех пользователей
import {authRoutes, publicRoutes} from "../routes";

import {Context} from "../index";

import {PARK_ROUTE} from "../utils/consts";

const AppRouter = () => {


    //получаем переменную isAuth из UserPark
    //Делаем деструктуризацию, вызываем хук useContext и туда передаем тот контекст который создавали
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component} />
            )}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} component={component} />
            )}

            <Redirect to={PARK_ROUTE}/>
        </Switch>
    )
}
export default AppRouter;