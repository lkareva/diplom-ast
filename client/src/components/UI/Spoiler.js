import React, { useState} from 'react'
import {CSSTransition} from "react-transition-group"
const Spoiler = ({title, body, onClickSpoiler, current, isDelete, loading, ...props}) => {
    const [hidden, setHidden] = useState(true)
    const reveal = () => {
        setHidden(!hidden);
    };
    return (
        <div {...props} className={current && body.find(i => i._id === current._id)?"spoiler current" :"spoiler"}>
            <div className="spoiler__wrap">
                <div className={hidden ? "spoiler__tit" : "spoiler__tit active"} onClick={reveal}><span>{title}</span>
                </div>
                <div className="spoiler__body">
                    <CSSTransition
                        in={!hidden}
                        timeout={{
                            enter: 0,
                            exit: 300
                        }}
                        classNames="spoiler"
                        unmountOnExit
                    >
                        <ul className={isDelete ?"spoiler__ul spoiler__ul--is-delete":"spoiler__ul"} >{//style = {hidden ? {display: 'none'} : {}}}>
                            body.map((item) => {
                            return (<li
                                key={item._id}
                                className={current && (item._id === current._id)?"spoiler__li current" :"spoiler__li"}
                                onClick={event => onClickSpoiler(item)}
                            >
                                <span>{item.name}</span>
                                {isDelete && <button className='btn-delete' disabled={loading}>
                                    <img src={require('../../img/icon/delete.svg')} alt=""/>
                                </button>}
                            </li>)}
                        )}
                        </ul>
                    </CSSTransition>
                </div>
            </div>
        </div>
    )
}
export default Spoiler