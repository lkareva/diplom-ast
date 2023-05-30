import React, {useState} from 'react'
import {metaData, options} from "../../utils/utils";

const LastData = ({dataLabel, dataData, dataDate, dataUnit, dataNormal}) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const date = new Date(dataDate)
    const dateString = date.toLocaleString("ru",options)
    const dateArray = dateString.split(',')
    return (
        <div className="data-title data-title_gray">
            <div className="data-title__data">
                <div>
                    <span>{dataLabel}</span>
                    <strong>{dataData}{dataUnit}</strong>
                </div>
                { dataData < dataNormal && <>
                    <img onMouseOver={handleMouseOver}
                         onMouseOut={handleMouseOut}
                         src={require("../../img/icon/warning.svg")}/>
                </>}
                {isHovering && (
                    <div className="data-title__warning">Данные ниже нормы</div>
                )}
            </div>
            <div className="data-title__date"><span>{dateArray[0]},</span><span>{dateArray[1]}</span></div>
        </div>
    );
};

export default LastData