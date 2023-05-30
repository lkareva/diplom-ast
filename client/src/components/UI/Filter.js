import React, {useState} from 'react'
import "nouislider/distribute/nouislider.css"
const Filter = ({children, classNameLocal}) => {
    const [hidden, setHidden] = useState(true)
    const reveal = () => {
        setHidden(!hidden);
    };
    return (
        <div className={classNameLocal ? classNameLocal + " filter" : "filter"}>
            <div className="filter__btn" onClick={reveal}><img src={require("../../img/icon/filter.svg")} alt=""/></div>
            {!hidden &&  <div className="filter__container">
                <div className="filter__body">
                    <div className="filter__tit">Выбрать метр</div>
                    {children}
                </div>
            </div>}
        </div>
    )
}

export default Filter