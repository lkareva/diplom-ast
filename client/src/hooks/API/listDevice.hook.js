import { useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useQuery} from "react-query";
const getListDevice = async (sectionId, token) => {
    return await fetch (
        `/api/section-map/${sectionId}/device`, {
            method: 'GET',
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => response.json())
}
export const useListDeviceQuery = (sectionId) => {
    const {token} = useContext(AuthContext)
    return  useQuery(["deviceList", sectionId, { token }],  () => getListDevice(sectionId, token))

}