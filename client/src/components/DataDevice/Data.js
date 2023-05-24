import React, {useState} from 'react'
import TableData from "../UI/TableData";
import Plot from "../UI/Plot";
import Pagination from "../UI/Pagination";

const Data = ({dataDevice}) => {
    return (
        <div>
            <Plot data={dataDevice}/>
            <TableData data={dataDevice}/>
        </div>
    )
}

export default Data