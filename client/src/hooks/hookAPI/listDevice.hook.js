import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useListDevice = (sectionId) => {
    const {token} = useContext(AuthContext)
    const {request: requestListDevice, loading: loadingListDevice} = useHttp()
    const [listDevice, setListDevice] = useState([])

    const getListDevice = useCallback(async () => {
        try {
            const fetched = await requestListDevice(`/api/section-map/${sectionId}/device`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setListDevice(fetched)
        } catch (e) {}
    }, [token, sectionId, requestListDevice])

    useEffect(() => {
        getListDevice()
    }, [getListDevice])

    return {listDevice, loadingListDevice}
}