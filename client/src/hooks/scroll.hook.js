import {useEffect, useRef} from "react"

export default function useScroll(isLoading, canLoad, parentRef, childRef, callback) {
    const observer = useRef()
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect()
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting && canLoad) {
                callback()
            }
        }, options)

        observer.current.observe(childRef.current)
    }, [callback, isLoading])
}