import {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useData = (deviceId, currentPage) => {
    const {token} = useContext(AuthContext)
    const {request: requestData, loading: loadingData} = useHttp()
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const getData = useCallback(async () => {
        try {
            const fetched = await requestData(`/api/device/${deviceId}/data?page=${currentPage || 1}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setData(fetched.docs)
            setTotalPages(fetched.totalPages)
        } catch (e) {}
    }, [token, deviceId, requestData, currentPage])

    useEffect(() => {
            getData()
    }, [getData])

    return {data, loadingData, totalPages}
}