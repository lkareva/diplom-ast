import React from 'react'
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {options} from '../../utils/utils'
const ChartData = ({data, height, dataNormal, dataName, dataUnit, widthMedia}) => {
    const gradientOffset = (dataNormal) => {
        const dataMax = Math.max(...data.map((i) => i[dataName]))
        const dataMin = Math.min(...data.map((i) => i[dataName]))

        if (dataMax <= dataNormal) {
            return 0
        }
        if (dataMin >= dataNormal) {
            return 1
        }

        return (dataMax - dataNormal) / (dataMax - dataMin)
    }
    const off = gradientOffset(dataNormal)

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart
                width={500}
                height={300}
                syncId="anyId"
                data={[...data].sort((a, b) => a.time > b.time ? 1 : -1)}
                margin={widthMedia > 500 &&{
                    top: 20,
                    right: 40,
                    left: 40,
                    bottom: 0,
                }}

                baseValue={dataNormal}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    type="number"
                    allowDataOverflow={true}
                    domain={['dataMin', 'dataMax']}
                    scale="time"
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleString("ru",options)
                    }}
                    isCategorical={false}
                    tickMargin={10}
                    hide={widthMedia <= 500}
                />
                <YAxis
                    allowDataOverflow={true}
                    domain={[`dataMin`, `dataMax`]}
                    unit={dataUnit}
                    tickMargin={10}
                    tickFormatter={(value) => {
                        return parseFloat(value).toFixed(1)
                    }}
                    hide={widthMedia <= 500}
                />
                <Tooltip
                    wrapperStyle={{outline: 'none'}}
                    separator=""
                    formatter={(value,  name)=>{
                        return [`${parseFloat(value).toFixed(1)} ${dataUnit}`, '']
                    }}
                    labelFormatter={(label)=>{
                        const date = new Date(label)
                        return date.toLocaleString("ru",options)
                    }}
                />
                <defs>
                    <linearGradient id={"splitColor-" + dataName } x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="#82ca9d" stopOpacity={1} />
                        <stop offset={off} stopColor="#ED3420" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey={dataName}
                    stroke="#282828"
                    fill={"url(#splitColor-"+dataName+")"}/>
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default ChartData