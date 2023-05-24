import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useTypeDevice = (typeId) => {
    const {token} = useContext(AuthContext)
    const {loading: loadingDeviceType, request: requestDeviceType} = useHttp()
    const [deviceType, setDeviceType] = useState(null)

    const fetchDeviceType = useCallback(async () => {
        try {
            const fetched = await requestDeviceType(`/api/type-device/${typeId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setDeviceType(fetched)
        } catch (e) {}
    }, [token, typeId, requestDeviceType])

    useEffect(() => {
        fetchDeviceType()
    }, [fetchDeviceType])

    return {deviceType, loadingDeviceType}
}