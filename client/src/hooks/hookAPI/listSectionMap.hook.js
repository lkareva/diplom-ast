import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useListSectionMap = (currentPage) => {
    const {token} = useContext(AuthContext)
    const {loading: loadingListSection, request: requestListSection} = useHttp()
    const [listSection, setListSection] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    const getListSection = useCallback(async () => {
        try {
            const fetched = await requestListSection(`/api/section-map?page=${currentPage || 1}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setListSection(prev => [...prev, ...fetched.docs])
            setTotalPages(fetched.totalPages)
        } catch (e) {}
    }, [token, requestListSection, currentPage])

    useEffect(() => {
        getListSection()
    }, [getListSection])

    return {listSection, loadingListSection, totalPages}
}