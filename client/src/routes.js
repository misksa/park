/*В этом файле описаны все маршруты к конкретным страницам которые есть в нашем приложении*/

//Импортируем константы из папки utils в файле consts
import {ADMIN_ROUTE, PARK_ROUTE, LOGIN_ROUTE, STATS_ROUTE} from "./utils/consts";

//Импортируем страничку AdminPanel
import AdminPanel from "./pages/AdminPanel";

//Импортируем страничку Auth
import Auth from "./pages/Login";

//Импортируем страничку Park
import Park from "./pages/Park";
import Stats from "./pages/Stats";


// Экспортируем массив authRoutes где указаны страницы к которым имеет доступ только авторизованный пользователь
export const authRoutes = [
    {
        //Передаем путь как константу из файла consts в папке utils
        path: ADMIN_ROUTE,

        //Указываем конкретную страницу из папки pages
        component: AdminPanel
    },
    {
        //Передаем путь как константу из файла consts в папке utils
        path: PARK_ROUTE,

        //Указываем конкретную страницу из папке pages
        component: Park
    },
    {
        //Передаем путь как константу из файла consts в папке utils
        path: STATS_ROUTE,

        //Указываем конкретную страницу из папке pages
        component: Stats
    },




]

// Экспортируем массив authRoutes где указаны страницы к которым имеет доступ все пользователи
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Auth
    }
]
