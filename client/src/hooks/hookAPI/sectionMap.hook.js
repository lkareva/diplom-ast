import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../http.hook";

export const useSectionMap = (sectionId) => {
    const {token} = useContext(AuthContext)
    const {loading: loadingSection, request: requestSection} = useHttp()
    const [section, setSection] = useState(null)

    const fetchSection = useCallback(async () => {
        try {
            const fetched = await requestSection(`/api/section-map/${sectionId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setSection(fetched)
        } catch (e) {}
    }, [token, sectionId, requestSection])

    useEffect(() => {
        fetchSection()
    }, [fetchSection])

    return {section, loadingSection}
}