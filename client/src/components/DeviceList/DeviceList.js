import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Spoiler from "../UI/Spoiler";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useMutation, useQueryClient} from "react-query";
import AddModal from "../UI/Modal/Modal";

export const DeviceList = ({typeDevices,devices, isDelete}) => {
    const queryClient = useQueryClient()
    const {token} = useContext(AuthContext)
    const [modalDelete, setModalDelete] = useState(false)
    const [itemDelete, setItemDelete] = useState("")
    const deleteDeviceMutation = useMutation( (deviceId) => {
        return fetch (
            `/api/device/${deviceId}`, {
                method: 'DELETE',
                body: null,
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => response.json())
    }, {
        onError: (context) => {
            message(context.message)
        },
        onSuccess: (context) => {
            message(context.message)
            queryClient.invalidateQueries('deviceList')
        }
    })
    const message = useMessage()
    const navigate = useNavigate()

    useEffect(() => {
        window.M.updateTextFields()
    }, [message])

    const navigateToDevice = (item) => {
        navigate(`/section-map-devices/${item._id}`)
    }

    const deleteItem = (item) =>{
        setItemDelete(item._id)
        setModalDelete(true)
    }
    const deleteDevice = (item) =>{
        deleteDeviceMutation.mutate(item)
        setModalDelete(false)
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
                                onClickSpoiler={!isDelete ? navigateToDevice : deleteItem}
                                isDelete={isDelete}
                                loading={deleteDeviceMutation.isLoading}
                            />
                        )
                    })}
            </div>}
            <AddModal visible={modalDelete} setVisible={setModalDelete}>
                <div className="device__message">Вы действительно хотите удалить?</div>
                <div className="device__box-btn">
                    <button className="device__btn btn" onClick={() => deleteDevice(itemDelete)}>
                        Удалить
                    </button>
                    <button className="device__btn btn" onClick={()=> setModalDelete(false)}>
                        Отмена
                    </button>
                </div>
            </AddModal>
        </div>
    )
}
