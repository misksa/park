/*В этом файле mobx следит за изменением переменных isAuth и user
и соотвественно при их изменении будут перерендываться компоненты*/

import {makeAutoObservable} from "mobx";

//Экспортируем и создаем class UserPark
export default class UserPark {

    //создаем конструктор, специальный блок инструкции вызываемый при создании объекта данного класса
    constructor() {
    //Создаем переменную isAuth _ означает что переменная изменяться не может
    this._isAuth = false

    this._user = {}

    this._client = []

    this._selectedClient = {}

     //Вызываем функцию makeAutoObservable и параметром передаем объект this, т.е. этот объект
    makeAutoObservable(this)
    }

//Создаем экшены это функции которые изменяют состояние
    //функция которая параметром принимает булевское значение
    setIsAuth(bool) {

        //И присваивает его переменной isAuth
        this._isAuth = bool
    }

    //Создаем функцию для изменения пользователя которая принимает значение пользователя
    SetUser(user) {

        //И присваивает его переменной user
        this._user = user
    }

    SetClient (client) {
        this._client = client
    }

    SetSelectedClient(client) {
        this._selectedClient = client
    }
    //Создаем гетеры, они нужны для того что бы получать переменные из нашего состояния
    //Они вызываются только в том случае если переменная которая внутри AppRouter была изменена
    get isAuth() {
        return this._isAuth
    }

    get User() {
        return this._user
    }

    get Client() {
        return this._client
    }

    get  SelectedClient () {
       return  this._selectedClient
    }
}