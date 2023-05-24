import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useListSectionMapAll = () => {
    const {token} = useContext(AuthContext)
    const {loading: loadingListSectionAll, request: requestListSectionAll} = useHttp()
    const [listSectionAll, setListSectionAll] = useState([])

    const getListSectionAll = useCallback(async () => {
        try {
            const fetched = await requestListSectionAll(`/api/section-map/all`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setListSectionAll(fetched)
        } catch (e) {}
    }, [token, requestListSectionAll])

    useEffect(() => {
        getListSectionAll()
    }, [getListSectionAll])

    return {listSectionAll, loadingListSectionAll}
}