//Создаем функцию для подсчета страниц
export const getPageCount = (totalCount, limit) => {
    //Делим общее кол-во элементов на лимит  и округляем получившееся значение в большую сторону
    return Math.ceil(totalCount / limit)
}


//Эту функцию изменить на собственный хук с useMemo
export const getPagesArray = (totalPages) => {
    let result = []
    for (let i = 0; i < totalPages ; i++) {
        result.push(i + 1)
    }
    return result;
}