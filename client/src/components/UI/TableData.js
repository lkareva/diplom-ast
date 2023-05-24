import React from 'react'
import {metaData, options} from '../../utils/utils'
const TableData = ({data}) => {
    return (
        <div>
            <table className="data-table">
                <thead>
                <tr>
                    <th>№</th>
                    {Object.keys(data[0]).map(key => {
                        const meta = metaData.find((item => item.code === key))
                        return (
                            <>
                                { key !== "time" && key !== "_id" && <th key={meta.name}>{meta.name}, {meta.unit}</th>}
                            </>
                        )
                    })}
                    <th>Дата и время</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    const date = new Date(item.time)
                    let keys = [];
                    for(let key in item){
                        keys.push(key);
                    }
                    return (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            {keys.map((key)=> {
                                const meta = metaData.find((item => item.code === key))
                                return (
                                    <>
                                    {key !== "time" && key !== "_id" && key !== "tension" &&
                                        <td style={meta.normal > parseFloat(item[key]).toFixed(1)
                                            ? {color: '#ED3420'}:{color: '#82ca9d'}}
                                        >{parseFloat(item[key]).toFixed(1)}</td>}
                                    </>
                                )
                            })}
                            <td>{date.toLocaleString("ru",options)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default TableData