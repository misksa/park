import {$host} from "./index";

import notice from "../utils/notice";

//API для предметов
export const createItem = async (item) => {
    const {data} = await $host.post('api/item', item)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }
    return data
}
export const fetchItem = async (officeId, placeId, subtypeId, page, limit, search) => {
    const {data} = await $host.get('api/item', {params: {
        officeId, placeId, subtypeId, page, limit, search
    }})
    return data
}

export const updateItem = async  (item) => {
    const {data} = await $host.put('api/item/update', item)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }
    return data
}

export const replaceOffice = async  (item) => {
       const {data} = await $host.post('api/item/office', item)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
export const editStatus = async (item) => {
    const {data} = await $host.post('api/item/status', item)
    return data
}
export const giveItem = async (item) => {
    const {data} = await $host.post('api/item/give', item)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }
    return data
}
//API для мест
export const createPlace = async (place) => {
    const {data} = await $host.post('api/place', place)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
export const fetchPlace = async () => {
    const {data} = await $host.get('api/place')
    return data
}

export const editPlace = async (place) => {
    const {data} = await $host.post('api/place/edit', place)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
export const deletePlace = async (place) => {
    const {data} = await $host.post('api/place/delete', place)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}

//API для офиса
export const createOffice = async (office) => {
    const {data} = await $host.post('api/office', office)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
export const fetchAuthOffice = async () => {
    const {data} = await $host.get('api/office/auth')
    return data
}
export const fetchPublicOffice = async () => {
    const {data} = await $host.get('api/office/public')
    return data
}

//API для типов и подтипов
export const createSubtype = async (subtype) => {
    const {data} = await $host.post('api/subtype', subtype)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
export const fetchSubtype = async () => {
    const {data} = await $host.get('api/subtype')
    return data
}
export const createType = async (type) => {
    const {data} = await $host.post('api/type', type)
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

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
    if(data.status === 200) {
        notice.Success(data.message)
    } else {
        notice.Error(data.message)
        return false
    }

    return data
}
//API для получения истории
export const fetchHistory = async (page, limit) => {
    const {data} = await $host.get('api/history', {params: {page, limit}})
    return data
}
export const fetchOneHistory = async (id, page, limit) => {
    const {data} = await $host.get('api/history/getOne', {params: {id, limit, page}})
    return data
}

//API для получения кол-ва разного оборудования
export const fetchCount = async () => {
    const {data} = await $host.get('api/count')
    return data
}
