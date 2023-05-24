import React, {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Spoiler from "../UI/Spoiler";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useMutation, useQueryClient} from "react-query";

export const DeviceList = ({typeDevices,devices, isDelete}) => {
    const queryClient = useQueryClient()
    const {token} = useContext(AuthContext)
    const deleteDeviceMutation = useMutation( (deviceId) => {
        return fetch (
            `/api/device/${deviceId}`, {
                method: 'DELETE',
                body: null,
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => response.json())
    }, {onSuccess: () => {
            message("Устройство удалено")
            queryClient.invalidateQueries('deviceList')
    }})
    const message = useMessage()
    const navigate = useNavigate()

    useEffect(() => {
        window.M.updateTextFields()
    }, [message])

    const navigateToDevice = (item) => {
        navigate(`/section-map-devices/${item._id}`)
    }

    const deleteDevice = (item) =>{
        deleteDeviceMutation.mutate(item._id)
    }

    return (
        <div className="device-list__list list-device">
            {!devices.length && !typeDevices.length
                    ? <div>Устройств пока нет</div>
                    : <div className="list-device__box">
                    {typeDevices.map((item) => {
                        return (
                            <Spoiler
                                key={item._id}
                                title={item.name}
                                body={devices.filter(i => i.idType === item._id)}
                                onClickSpoiler={!isDelete ? navigateToDevice : deleteDevice}
                                isDelete={isDelete}
                                loading={deleteDeviceMutation.isLoading}
                            />
                        )
                    })}
            </div>}
        </div>
    )
}
