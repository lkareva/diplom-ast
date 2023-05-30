import React, {useEffect, useRef, useState} from 'react'
import {metaData} from "../../utils/utils";
import LastData from "../UI/LastData";
import ChartData from "../UI/ChartData";
import {useResizeWidth} from "../../hooks/width.hook";

const SectionMapPlot = ({data, isOpenBottom}) => {
    const dataKey = Object.keys(data[0]).filter(key => key !== "time" && key !== "_id")
    const [isOpenData, setIsOpenData] = useState(0)
    const refChar = useRef(null);
    const {width} = useResizeWidth(refChar)
    return (
        <>  {isOpenData !== 0 && dataKey.length !== 1 && <div className="section-map__prev"
                 onClick={() => 0 < isOpenData ? setIsOpenData(prev => prev - 1) : -1}
            >
                <img src={require('../../img/icon/arrow.svg')}
                     alt=""
                />
            </div>}
            {dataKey.map(key => {
                const meta = metaData.find((item => item.code === key))
                const d = parseFloat(data.at(0)[key]).toFixed(1)
                const t = data.at(0).time
                return (
                    <>
                        { meta && dataKey[isOpenData] === key &&
                            <div className="section-map__data">
                                <LastData
                                    dataDate={t}
                                    dataData={d}
                                    dataLabel={meta.name}
                                    dataUnit={meta.unit}
                                    dataNormal={meta.normal}/>
                                {isOpenBottom && <div ref={refChar} className={width > 500 ?"chart chart-without-margin" : "chart chart-without-margin chart-media-500" }>
                                    <ChartData
                                        widthMedia={width}
                                        height={200}
                                        dataNormal={meta.normal}
                                        dataName={key}
                                        dataUnit={meta.unit}
                                        data={data}/>
                                </div>}
                            </div>

                        }
                    </>
                )
            })}
            {isOpenData !== (dataKey.length - 1) &&  dataKey.length !== 1 && <div className="section-map__next"
                 onClick={() => (dataKey.length - 1) > isOpenData ? setIsOpenData(prev => prev + 1) : -1}
            >
                <img src={require('../../img/icon/arrow.svg')}
                     alt=""
                />
            </div>}
        </>
    )
}

export default SectionMapPlot