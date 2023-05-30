import {useEffect, useState} from "react"

export const useResizeWidth = (refChar) => {
    const [width, setWidth] = useState( refChar.current ? refChar.current.offsetWidth : 0)
    const handleResize = () => {
        if (refChar.current) {
            setWidth(refChar.current.offsetWidth)
        }
    }
    useEffect(() => {
    if (refChar.current) {
        setWidth(refChar.current.offsetWidth)
    }
    window.addEventListener('load', handleResize)
    window.addEventListener("resize", handleResize)
    return () => {
        window.removeEventListener('load', handleResize)
        window.removeEventListener("resize", handleResize)
    }
}, [refChar, handleResize])
return {width}
}