export const chooseAccess = (e, setAccess, access) => {
    if(e.target.checked) {
        setAccess([...access, e.target.value])
    } else {
        setAccess(access.filter(access => access !== e.target.value))
    }
}