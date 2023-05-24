import React from 'react'
import Select from "react-select";

const SearchSection = ({sections, onAnchor, ...props}) => {
    const optionsSection = sections.map(item => {
        return {
            value: item._id,
            label: item.name
        }
    })
    return (
        <div {...props}>
            <Select
                name="search-sectionId"
                className="add-device__select select--transparent"
                classNamePrefix="select-add-device"
                placeholder="Поиск по анкерным участкам"
                options={optionsSection}
                isSearchable
                isClearable
                onChange={newValue => newValue && newValue.value !== '' ? onAnchor(newValue.value) :  false}
            />
        </div>
    )
}

export default SearchSection