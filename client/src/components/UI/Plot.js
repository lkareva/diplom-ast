import React, {useEffect, useRef, useState} from 'react'
import ChartData from "./ChartData";
import {metaData} from '../../utils/utils'
import LastData from "./LastData";
import {useResizeWidth} from "../../hooks/width.hook";
const Plot = ({data, ...props}) => {
    const refChar = useRef(null);
    const {width} = useResizeWidth(refChar)
    return (
        <div {...props}>
            {Object.keys(data[0]).map(key => {
                const meta = metaData.find((item => item.code === key))
                const d = parseFloat(data.at(0)[key]).toFixed(1)
                const t = data.at(0).time
                return (
                    <>
                        { meta && key !== "time" && key !== "_id" &&
                            <>
                                <LastData
                                    dataData={d}
                                    dataDate={t}
                                    dataLabel={meta.name}
                                    dataUnit={meta.unit}
                                    dataNormal={meta.normal}/>
                                <div className={width > 500 ? "chart" : "chart chart-media-500"} ref={refChar} >
                                    <ChartData
                                        widthMedia={width}
                                        height={200}
                                        dataNormal={meta.normal}
                                        dataName={key}
                                        dataUnit={meta.unit}
                                        data={data}/>
                                </div>
                            </>

                        }
                    </>
                )
            })}
        </div>
    )
}

export default Plot