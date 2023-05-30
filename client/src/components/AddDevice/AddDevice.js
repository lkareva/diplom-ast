import React, {useState} from 'react'
import MyInput from "../UI/MyInput";
import Select from "react-select";
import {usePosts} from "../../hooks/filter.hook";
import AsyncSelect from "react-select/async";
import {Link} from "react-router-dom";

const AddDevice = ({addDeviceForm, setAddDeviceForm, listDeviceType, listSectionAll, addDevice, loading, disableSection, defaultSectionId, ...props}) => {

    const optionsSection = listSectionAll.map(item => {
        return {
            value: item._id,
            label: item.name
        }
    })
    optionsSection.unshift({ label: 'Выберете анкерный участок', value: '' })

    const optionsType = listDeviceType.map(item => {
       return{
           value: item._id,
           label: item.name
       }
    })
    optionsType.unshift({ label: 'Выберете тип устройства', value: '' })

    return (
        <>
            <div className="search__form" id="add-device-name">
                <MyInput
                    name="add-device-name"
                    type="text"
                    placeholder="Введите имя устройсва"
                    disabled={loading}
                    value={addDeviceForm.name}
                    onChange={e => setAddDeviceForm({...addDeviceForm, name: e.target.value})}
                />
            </div>
            <Select
                id="add-device-typeId"
                name="add-device-typeId"
                className="add-device__select"
                classNamePrefix="select-add-device"
                placeholder="Выберете тип устройства"
                options={optionsType}
                isSearchable
                isDisabled={loading}
                value={optionsType.find(item => item.value === addDeviceForm.idType) || optionsType[0]}
                onChange={newValue => newValue ? setAddDeviceForm({...addDeviceForm, idType: newValue.value}) : setAddDeviceForm({...addDeviceForm, idType: ''})}
            />
            <Select
                id="add-device-sectionId"
                name="add-device-sectionId"
                className="add-device__select"
                classNamePrefix="select-add-device"
                placeholder="Выберете анкерный участок"
                options={optionsSection}
                isSearchable
                isDisabled={loading || disableSection}
                value={!disableSection ? optionsSection.find(item => item.value === addDeviceForm.idSection) || optionsSection[0] : optionsSection.find(item => item.value === defaultSectionId) || optionsSection[0]}
                onChange={newValue => newValue ? setAddDeviceForm({...addDeviceForm, idSection: newValue.value}) : setAddDeviceForm({...addDeviceForm, idSection: ''})}
            />
            <div className="add-device__btn-wrap">
                <div className="add-device__btn btn">
                    <button
                        disabled={loading}
                        onClick={() => addDevice(addDeviceForm)}
                    >Добавить устройство</button>
                </div>
            </div>
        </>
    )
}

export default AddDevice