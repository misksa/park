import {$host} from "./index";


//API для предметов
export const createItem = async (item) => {
    const {data} = await $host.post('api/item', item)
    return data
}
export const fetchItem = async (officeId, placeId, subtypeId) => {
    const {data} = await $host.get('api/item', {params: {
        officeId, placeId, subtypeId
    }})
    return (data)
}
export const updateItem = async  (item) => {
    const {data} = await $host.put('api/item/update', item)
    return (data)
}
export const replaceOffice = async  (item) => {
    const {data} = await $host.put('api/item/office', item)
    return (data)
}
//API для мест
export const createPlace = async (place) => {
    const {data} = await $host.post('api/place', place)
    return data
}
export const fetchPlace = async () => {
    const {data} = await $host.get('api/place')
    return data
}

export const deletePlace = async (place) => {
    const {data} = await $host.post('api/place/delete', place)
    return data
}

//API для офиса
export const createOffice = async (office) => {
    const {data} = await $host.post('api/office', office)
    return data
}
export const fetchOffice = async (office) => {
    const {data} = await $host.get('api/office')
    return data
}

//API для типов и подтипов
export const createSubtype = async (subtype) => {
    const {data} = await $host.post('api/subtype', subtype)
    return data
}
export const fetchSubtype = async () => {
    const {data} = await $host.get('api/subtype')
    return data
}

export const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}
//API для сообщений
export const fetchMessage = async () => {
    const {data} = await $host.get('api/message')
    return data
}
export const createMessage = async (message) => {
    const {data} = await $host.post('api/message', message)
    return data
}
//API для получения истории
export const fetchHistory = async () => {
    const {data} = await $host.get('api/history')
    return data
}

//API для получения кол-ва разного оборудования
export const fetchCount = async () => {
    const {data} = await $host.get('api/subtype/count')
    return data
}
