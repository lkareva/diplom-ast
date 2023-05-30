import React from 'react'
import {Search} from "./Search";
import Filter from "./Filter";
import MyInput from "./MyInput";
import Nouislider from "nouislider-react";

const FilterSection = ({filter, setFilter}) => {
    return (
        <div className="section-page__options">
            <Search
                classNameLocal="section-page__search"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <Filter classNameLocal="section-page__filter">
                <div className="filter__slider">
                    <Nouislider
                        connect
                        range={{ min: 0, max: 640000 }}
                        start={[filter.sortFrom, filter.sortTo]}
                        step={1}
                        onChange={(values) => {
                            console.log(values)
                            setFilter({...filter, sortFrom: values[0], sortTo: values[1]})
                        }}
                    />
                </div>
                <div className="filter__inputs">
                    <MyInput
                        className="filter__input"
                        type="text"
                        placeholder="м от"
                        value={filter.sortFrom}
                        onChange={e => setFilter({...filter, sortFrom: e.target.value})}
                    />
                    <MyInput
                        className="filter__input"
                        type="text"
                        placeholder="м до"
                        value={filter.sortTo}
                        onChange={e => setFilter({...filter, sortTo: e.target.value})}
                    />
                </div>
                <div className="filter__update icon-03" onClick={() => setFilter({...filter, sortFrom: 0, sortTo:640000})}></div>
            </Filter>
        </div>
    )
}

export default FilterSection