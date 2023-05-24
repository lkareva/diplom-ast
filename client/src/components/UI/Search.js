import React from 'react'
import MyInput from "./MyInput";

export const Search = ({classNameLocal, ...props}) => {
    return (
        <div className={classNameLocal ? classNameLocal + " search" : "search"}>
            <div className="search__form">
                <div className="search__item">
                    <label htmlFor="search-src" className="search__label-btn">
                        <img src={require('../../img/icon/search.svg')} alt=""/>
                    </label>
                </div>
                <MyInput
                    id="search-src"
                    name="search-src"
                    type="text"
                    placeholder="Поиск"
                    {...props}
                />
            </div>
        </div>
    )
}
