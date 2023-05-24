import React from "react";
import {useParams} from "react-router-dom";
import {Loader} from "../components/UI/Loader";
import {ContainerDevice} from "../components/Device/ContainerDevice";
import {useDevice} from "../hooks/hookAPI/device.hook";

const DevicePage = () => {
    const deviceId = useParams().idDevice
    const {device, loadingDevice} = useDevice(deviceId)

    if (loadingDevice) {
        return <Loader />
    }

    return (
        <>
            { !loadingDevice &&
            device
                ? <ContainerDevice device={device} />
                : <div>Такого устройства нет</div>}
        </>
    )
}

export default DevicePage