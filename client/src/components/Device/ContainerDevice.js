import React from 'react'
import {Loader} from "../UI/Loader";
import Device from "./Device";
import {useTypeDevice} from "../../hooks/hookAPI/typeDevice.hook";
import {useSectionMap} from "../../hooks/hookAPI/sectionMap.hook";
export const ContainerDevice = ({device}) => {
  const {deviceType, loadingDeviceType} = useTypeDevice(device.idType)
  const {section, loadingSection} = useSectionMap(device.idSection)

  if (loadingSection || loadingDeviceType) {
    return <Loader />
  }
  return (
      <>
        {!loadingSection && !loadingDeviceType
            && (section && deviceType)
            ? <Device deviceName={device.name} deviceSec={section.name} deviceType={deviceType.name} deviceId={device._id}/>
            : <div>Устройства с такими данными не существует</div>
        }
      </>
  )
}
