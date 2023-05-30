import { useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useQuery} from "react-query";
const getUser = async (userId, token) => {
    return await fetch (
        `/api/auth/${userId}`, {
            method: 'GET',
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => response.json())
}
export const useUserQuery = () => {
    const {userId, token} = useContext(AuthContext)
    return  useQuery(["user", userId, {token}],  () => getUser(userId, token))

}