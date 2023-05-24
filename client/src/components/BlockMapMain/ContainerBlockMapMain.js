import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../UI/Loader";
import BlockMapMain from "./BlockMapMain";
import {useSectionMap} from "../../hooks/hookAPI/sectionMap.hook";
import {useListTypeDevice} from "../../hooks/hookAPI/listTypeDevice.hook";
import {useListDevice} from "../../hooks/hookAPI/listDevice.hook";
import {useListDeviceQuery} from "../../hooks/API/listDevice.hook";

const ContainerBlockMapMain = ({sectionId, isOpenBottom}) => {
    const {section, loadingSection} = useSectionMap(sectionId)
    const listDevice = useListDeviceQuery(sectionId)
    const {listDeviceType, loadingListDeviceType} = useListTypeDevice()

    return (
        <>
            { listDevice.isSuccess && !loadingSection && !loadingListDeviceType
                ? <> {
                    section && listDeviceType && listDevice.data
                        ? <BlockMapMain
                            section={section}
                            devices={listDevice.data}
                            typeDevices={listDeviceType}
                            isOpenBottom={isOpenBottom}
                        />
                        : <div>Данных нет</div>
                }</>
                : <Loader />
            }
        </>
    )
}

export default ContainerBlockMapMain