/*В этом файле mobx следит за изменением переменных isAuth и user
и соотвественно при их изменении будут перерендываться компоненты*/

import { makeAutoObservable} from "mobx";

// configure({
//     useProxies: "never"
// })

//Экспортируем и создаем class UserPark
export default class Park {

    //создаем конструктор, специальный блок инструкции вызываемый при создании объекта данного класса
    constructor() {
        //Создаем переменную isAuth _ означает что переменная изменяться не может
        this._office = []
        this._authOffice =[]
        this._Message = []
        this._place = []
        this._Items = []
        this._typeItem = []
        this._Subtype = []
        this._history = []
        this._Count = []
        this._replaceItems = false
        this._edit = false
        this._load = null
        this._filter = ''
        this._SelectedSubtype = {}
        this._SelectedEdit = {}
        this._SelectedPlace = {}
        this._SelectedModalPlace = {}
        this._SelectedModalOffice = {}
        this._SelectedTypeItem = {}
        this._SelectedOffice = {}
        this._SelectedItems = []
        this._SelectedMessage = {}
        this._page = 1
        this._totalCountItems = 0
        this._limitItems = 30
        this._pageHistory = 1
        this._totalCountHistory = 0
        this._limitHistory = 27
        this._pageHistoryModal = 1
        this._totalCountHistoryModal = 0
        this._limitHistoryModal = 15
        this._pageMessage = 1
        this._totalCountMessage = 0
        this._limitMessage = 5

        //Вызываем функцию makeAutoObservable и параметром передаем объект this, т.е. этот объект
        makeAutoObservable(this)
    }
    //Офис-------------------------------------------------------------------------------------
    SetOffice(office) {
        this._office = office
    }
    SetAuthOffice(office) {
        this._authOffice = office
    }
    SetSelectedOffice(office) {
        this.SetPage(1)
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
    get authOffice() {
        return this._authOffice
    }

    get SelectedOffice() {
        return this._SelectedOffice
    }
    //Места в офисе----------------------------------------------------------------------------------------
    SetPlace(place) {
        this._place = place
    }
    SetSelectedPlace(place) {
        this.SetPage(1)
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
        this.SetPage(1)
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
        this._SelectedItems = Items
    }
    get Items() {
        return this._Items
    }
    setSearch (Filter) {
        this._filter = Filter
    }
    get Search () {
        return this._filter
    }
    get SelectedItems() {
        return this._SelectedItems
    }
    //Для пагинации-----------------------------------------------------------------------------
    SetPage(page) {
        this._page = page
    }
    SetTotalCount(totalCount) {
        this._totalCountItems = totalCount
    }

    get Limit () {
        return this._limitItems
    }
    get Page() {
        return this._page
    }
    get totalCount() {
        return this._totalCountItems
    }
    //Пагинация для истории----------------------------------------------------------------------------
    SetPageHistory(pageHistory) {
        this._pageHistory = pageHistory
    }

    SetTotalCountHistory(totalCountHistory) {
        this._totalCountHistory = totalCountHistory
    }

    get LimitHistory () {
        return this._limitHistory
    }
    get PageHistory() {
        return this._pageHistory
    }
    get totalCountHistory() {
        return this._totalCountHistory
    }

    SetPageHistoryModal(page) {
        this._pageHistoryModal = page
    }

    SetTotalCountHistoryModal(totalCountHistory) {
        this._totalCountHistoryModal = totalCountHistory
    }

    get LimitHistoryModal () {
        return this._limitHistoryModal
    }
    get PageHistoryModal() {
        return this._pageHistoryModal
    }
    get totalCountHistoryModal() {
        return this._totalCountHistoryModal
    }

//Пагинация для сообщений------------------------------------------------------------------------------------------
    SetPageMessage(page) {
        this._pageMessage = page
    }
    SetTotalCountMessage(totalCount) {
        this._totalCountMessage = totalCount
    }

    get LimitMessage () {
        return this._limitMessage
    }
    get PageMessage() {
        return this._pageMessage
    }
    get totalCountMessage() {
        return this._totalCountMessage
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
    SetHistoryModal(History) {
        this._history = History
    }
    get HistoryModal() {
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
    //загрузка--------------------------------------------------------------------------------------------
    setLoad(boolean) {
        this._load = boolean
    }
    get Load() {
        return this._load
    }
}
