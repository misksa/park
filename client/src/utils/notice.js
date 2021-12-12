import {toast} from "react-toastify";

export default class notice {
static Error (data)  {
    toast.error(data, {
    })
}
static Success (data) {
    toast.success(data, {
    })
}
}
