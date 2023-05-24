import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../UI/Loader";
import {DeviceList} from "./DeviceList";
import {Link, useParams} from "react-router-dom";
import {useListDevice} from "../../hooks/hookAPI/listDevice.hook";
import {useTypeDevice} from "../../hooks/hookAPI/typeDevice.hook";
import {useListTypeDevice} from "../../hooks/hookAPI/listTypeDevice.hook";
import {useQuery, useQueryClient} from "react-query";
import {useListDeviceQuery} from "../../hooks/API/listDevice.hook";
import AddModal from "../UI/Modal/Modal";
import AddDeviceContainer from "../AddDevice/AddDeviceContainer";

const DeviceListContainer = ({sectionId}) => {
    const queryClient = useQueryClient()
    const listDevice  =useListDeviceQuery(sectionId)
    const {listDeviceType, loadingListDeviceType} = useListTypeDevice()
    const [isDelete, setIsDelete] = useState(false)
    const [modal, setModal] = useState(false)
    const setDelete = () => {
        setIsDelete(!isDelete);
    };
    if (listDevice.isLoading && loadingListDeviceType) {
        return <Loader/>
    }
    return (
        <>
            {listDevice.isSuccess && !loadingListDeviceType && <DeviceList devices={listDevice.data} typeDevices={listDeviceType} isDelete={isDelete}/>}
            <div className="device-list__btn-list">
                <div className="device-list__btn-wrap">
                    <button className="device__btn btn"  onClick={() => setModal(true)}>
                        Добавить устройство
                    </button>
                    <AddModal visible={modal} setVisible={setModal}>
                        <AddDeviceContainer setModal={setModal} defaultSectionId={sectionId}/>
                    </AddModal>
                </div>
                <div className="device-list__btn-wrap">
                    <button className={isDelete?"device__btn btn btn--is-delete" : "device__btn btn"} onClick={setDelete}>
                        Удалить устройство
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeviceListContainer