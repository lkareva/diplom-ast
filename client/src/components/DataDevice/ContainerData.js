import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Loader} from "../UI/Loader";
import {ContainerDevice} from "../Device/ContainerDevice";
import Data from "./Data";
import {typingData} from "../../utils/utils";
import {useData} from "../../hooks/hookAPI/data.hook";
import Pagination from "../UI/Pagination";

const ContainerData = ({deviceId}) => {
    const [current, setCurrent] = useState(1)
    const { data, loadingData, totalPages} = useData(deviceId, current)
    const onClick = (curr, type) => {
        if(isNaN(curr)) return;
        if (type === "previous" && current > 1) {
            setCurrent(curr - 1)
        } else if (type === "next" && curr < totalPages) {
            setCurrent(curr + 1)
        } else {
            setCurrent(curr)
        }
    }
    if (loadingData) {
        return <Loader />
    }

    const dataDevice = typingData(data)

    return (
        <>
            <Pagination totalPage={totalPages || 1} current={current} changePage={onClick} />
            {!loadingData && data
                ? data.length
                    ? <Data dataDevice={dataDevice} />
                    : <div>Данных пока нeт</div>
                : <div>Данных пока нeт</div>}
        </>
    )

}

export default ContainerData