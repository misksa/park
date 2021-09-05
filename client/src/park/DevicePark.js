/*В этом файле mobix следит за изменением переменных isAuth и user
и соотвественно при их изменении будут перерендываться компоненты*/

import {makeAutoObservable} from "mobx";

//Экспортируем и создаем class UserPark
export default class Park {

    //создаем конструктор, специальный блок инструкции вызываемый при создании объекта данного класса
    constructor() {
        //Создаем переменную isAuth _ означает что переменная изменяться не может
        this._office = []
        this._Message = []
        this._place = []
        this._Items = []
        this._typeItem = []
        this._Subtype = []
        this._history = []
        this._Count = []
        this._replaceItems = false
        this._edit = false
        this._SelectedSubtype = {}
        this._SelectedEdit = {}
        this._SelectedPlace = {}
        this._SelectedModalPlace = {}
        this._SelectedModalOffice = {}
        this._SelectedTypeItem = {}
        this._SelectedOffice = {}
        this._SelectedItems = {}
        this._SelectedMessage = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        //Вызываем функцию makeAutoObservable и параметром передаем объект this, т.е. этот объект
        makeAutoObservable(this)
    }
    //Офис-------------------------------------------------------------------------------------
    SetOffice(office) {
        this._office = office
    }
    SetSelectedOffice(office) {
        this._SelectedOffice = office
    }
    SetSelectedModalOffice(office) {
        this._SelectedModalOffice = office
    }
    get SelectedModalOffice() {
        return this._SelectedModalOffice
    }
    get office() {
        return this._office
    }
    get SelectedOffice() {
        return this._SelectedOffice
    }
    //Места в офисе----------------------------------------------------------------------------------------
    SetPlace(place) {
        this._place = place
    }
    SetSelectedPlace(place) {
        this._SelectedPlace = place
    }
    SetSelectedModalPlace(place) {
        this._SelectedModalPlace = place
    }
    get place() {
        return this._place
    }
    get SelectedModalPlace() {
        return this._SelectedModalPlace
    }
    get SelectedPlace() {
        return this._SelectedPlace
    }
    //Типы--------------------------------------------------------------------------------------------------
    SetTypeItem(typeItem) {
        this._typeItem = typeItem
    }
    SetSelectedTypeItem(typeItem) {
        this._SelectedTypeItem = typeItem
    }

    get typeItem() {
        return this._typeItem
    }

    get SelectedTypeItem() {
        return this._SelectedTypeItem
    }
    //подтипы-----------------------------------------------------------------------------------------
    SetSubtype(Subtype) {
        this._Subtype = Subtype
    }
    SetSelectedSubtype(Subtype) {
        this._SelectedSubtype = Subtype
    }
    get Subtype() {
        return this._Subtype
    }
    get SelectedSubtype() {
        return this._SelectedSubtype
    }
    //Предметы парка --------------------------------------------------------------------------------------

    SetItem (Items) {
        this._Items = Items
    }
    SetSelectedItems (Items) {
        this._SelectedItem = Items
    }
    get Items() {
        return this._Items
    }
    get SelectedItems() {
        return this._SelectedItems
    }
    //Для страницы-----------------------------------------------------------------------------
    SetPage(page) {
        this._page = page
    }
    SetSelectedPage(page) {
        this._SelectedPage = page
    }
    get page() {
        return this._page
    }
    get SelectedPage() {
        return this._SelectedPage
    }
    //Для totalCount-----------------------------------------------------------------------------
    SetTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    SetSelectedTotalCount(totalCount) {
        this._SelectedTotalCount = totalCount
    }
    get totalCount() {
        return this._totalCount
    }
    get SelectedTotalCount() {
        return this._SelectedTotalCount
    }
    //Для limit--------------------------------------------------------------------------------------------------
    SetLimit(limit) {
        this._limit = limit
    }
    SetSelectedLimit(limit) {
        this._SelectedLimit = limit
    }
    get limit() {
        return this._limit
    }
    get SelectedLimit() {
        return this._SelectedLimit
    }
//Для редактирования---------------------------------------------------------------------------------------------
    SetEdit(edit) {
        this._edit = edit
    }
    SetSelectedEdit (edit) {
        this._SelectedEdit = edit
    }
    get Edit () {
        return this._edit
    }
    get SelectedEdit () {
        return this._SelectedEdit
    }
    //Сообщения-------------------------------------------------------------------------------------
    SetMessage(Message) {
        this._Message = Message
    }
    SetSelectedMessage(Message) {
        this._SelectedMessage = Message
    }
    get Message() {
        return this._Message
    }
    get SelectedMessage() {
        return this._SelectedMessage
    }
    //История----------------------------------------------------------------------------------
    SetHistory(History) {
        this._history = History
    }
    get History() {
        return this._history
    }
    //Перемещение предметов между офисами--------------------------------------------------------------
    SetReplaceItems(boolean) {
        this._replaceItems = boolean
    }

    get replaceItems () {
        return this._replaceItems
    }
    //Статистика-----------------------------------------------------------------------------------
    SetCount(count) {
        this._Count = count
    }
    get Count () {
        return this._Count
    }
}
