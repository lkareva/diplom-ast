import React, {useContext, useEffect, useState} from 'react'
import AddDevice from "./AddDevice";
import {useListTypeDevice} from "../../hooks/hookAPI/listTypeDevice.hook";
import {Loader} from "../UI/Loader";
import {useListSectionMapAll} from "../../hooks/hookAPI/listSectionMapAll.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {useMutation, useQueryClient} from "react-query";

const AddDeviceContainer = ({setModal, defaultSectionId}) => {
    const queryClient = useQueryClient()
    const [addDeviceForm, setAddDeviceForm] = useState({name: '', idType: '', idSection: defaultSectionId || ''})
    const {listDeviceType, loadingListDeviceType} = useListTypeDevice()
    const {listSectionAll, loadingListSectionAll} = useListSectionMapAll()
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const addDeviceMutation = useMutation( (form) => {
        return fetch (
            `/api/device`, {
                method: 'POST',
                body: JSON.stringify({...form}),
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`}
            }).then((response) => response.json())
    }, {
        onError: (context) => {
            message(`Возникла ошибка: ${context.message}`)
        },
        onSuccess: (context,variables) => {
            message(context.message)
            setAddDeviceForm({name: '', idType: '', idSection: defaultSectionId || ''})
            setModal(false)
            queryClient.invalidateQueries('deviceList')

        }
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [message])

    const addDevice = async (form) => {
        let error = 0;
        if (form.name === ''){
            message("Введите название устройства")
            error++;
        }
        if (form.idType === ''){
            message("Выберете тип устройства")
            error++;
        }
        if (form.idSection === '') {
            message("Выберете тип анкерный участок на котором расположено устройство")
            error++;
        }
        if(error === 0){
            addDeviceMutation.mutate(form)
        }
    }

    if (loadingListDeviceType || loadingListSectionAll) {
        return <Loader/>
    }
    return (
        <div>
            {!loadingListDeviceType && !loadingListSectionAll && listDeviceType && listSectionAll &&
                <AddDevice
                    addDeviceForm={addDeviceForm}
                    setAddDeviceForm={setAddDeviceForm}
                    listDeviceType={listDeviceType}
                    listSectionAll={listSectionAll}
                    addDevice={addDevice}
                    loading={addDeviceMutation.isLoading}
                    disableSection={!!defaultSectionId}
                    defaultSectionId={defaultSectionId}
                />}
        </div>
    )
}

export default AddDeviceContainer