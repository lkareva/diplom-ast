import React from 'react'
import {Link} from "react-router-dom";
import ContainerData from "../DataDevice/ContainerData";

const Device = ({deviceSec, deviceType, deviceName, deviceId}) => {
    return (
        <>
            <div className="device__title">
                <div className="device__left">
                    <div className="device__tit"><h2>{deviceName}</h2></div>
                    <div className="device__type">{deviceType}</div>
                    <div className="device__anchor">{deviceSec}</div>
                </div>
                <div className="device__right">
                    <div className="device__btn btn">
                        <Link to="#">Экспорт данных</Link>
                    </div>
                </div>
            </div>
            <ContainerData deviceId={deviceId}/>
        </>
    )
}

export default Device