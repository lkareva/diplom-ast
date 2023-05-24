import React from 'react'
import {useData} from "../../hooks/hookAPI/data.hook";
import SectionMapPlot from "./SectionMapPlot";
import {Loader} from "../UI/Loader";
import Plot from "../UI/Plot";
import {typingData} from "../../utils/utils";

const ContainerSectionMapPlot = ({deviceId, isOpenBottom}) => {
    const {data, loadingData} = useData(deviceId, 1)
    return (
        <div className="section-map__data-box">
            { !loadingData
                ? <>
                    {data.length
                        ? <SectionMapPlot data={typingData(data)} isOpenBottom={isOpenBottom}/>
                        : <div className="data-title_gray">Данных пока нет</div>
                    }
                </>
                : <Loader/>

            }
        </div>
    )
}

export default ContainerSectionMapPlot