import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useListTypeDevice = () => {
    const {token} = useContext(AuthContext)
    const {loading: loadingListDeviceType, request: requestListDeviceType} = useHttp()
    const [listDeviceType, setListDeviceType] = useState([])

    const fetchListDeviceType = useCallback(async () => {
        try {
            const fetched = await requestListDeviceType(`/api/type-device/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setListDeviceType(fetched)
        } catch (e) {}
    }, [token, requestListDeviceType])

    useEffect(() => {
        fetchListDeviceType()
    }, [fetchListDeviceType])

    return {listDeviceType, loadingListDeviceType}
}