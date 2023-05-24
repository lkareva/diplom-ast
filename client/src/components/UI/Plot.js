import React from 'react'
import ChartData from "./ChartData";
import {metaData} from '../../utils/utils'
import LastData from "./LastData";
const Plot = ({data, ...props}) => {
    return (
        <div {...props}>
            {Object.keys(data[0]).map(key => {
                const meta = metaData.find((item => item.code === key))
                const d = parseFloat(data.at(-1)[key]).toFixed(1)
                const t = data.at(-1).time
                return (
                    <>
                        { meta && key !== "time" && key !== "_id" &&
                            <>
                                <LastData dataData={d} dataDate={t} dataLabel={meta.name} dataUnit={meta.unit} dataNormal={meta.normal}/>
                                <div className={"chart"}>
                                    <ChartData height={200} dataNormal={meta.normal} dataName={key} dataUnit={meta.unit} data={data}/>
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