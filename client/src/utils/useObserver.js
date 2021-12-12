import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoad, callback) => {
    const Observer = useRef()
    useEffect(()=>{
        if(isLoad) return;
        if(Observer.current) Observer.current.disconnect()
                let cb = function (entries, observer) {
                    if(entries[0].isIntersecting && canLoad){
                        callback()
                    }
            }
        Observer.current = new IntersectionObserver(cb)
        Observer.current.observe(ref.current)
    }, [isLoad, ref, canLoad, callback])
}
