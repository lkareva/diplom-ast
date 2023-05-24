import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useDevice = (deviceId) => {
    const {token} = useContext(AuthContext)
    const {request: requestDevice, loading: loadingDevice} = useHttp()
    const [device, setDevice] = useState(null)

    const getDevice = useCallback(async () => {
        try {
            const fetched = await requestDevice(`/api/device/${deviceId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setDevice(fetched)
        } catch (e) {}
    }, [token, deviceId, requestDevice])

    useEffect(() => {
        getDevice()
    }, [getDevice])

    return {device, loadingDevice}
}