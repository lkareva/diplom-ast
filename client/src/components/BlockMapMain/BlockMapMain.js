import React, {useState} from 'react';
import Spoiler from "../UI/Spoiler";
import Plot from "../UI/Plot";
import ContainerSectionMapPlot from "../SectionMapPlot/ContainerSectionMapPlot";

const BlockMapMain = ({section, devices, typeDevices, isOpenBottom}) => {
    const [current, setCurrent] = useState(devices[0])
    const onClickSpoiler = (item) => {
        setCurrent(item)
    }
    return (
                <div className="section-map__body">
                    <div className="section-map_items">
                        <div className="section-map__tit">
                            <h2>{section.name}</h2>
                            <div className="section-map__device">{current ? current.name : '' }</div>
                        </div>
                        {isOpenBottom && <div className="section-map__device-list list-device">
                            <div className="list-device__box">
                                {devices.length
                                    ? typeDevices.map((item) => {
                                        return (
                                            <Spoiler
                                                key={item._id}
                                                title={item.name}
                                                body={devices.filter(i => i.idType === item._id)}
                                                onClickSpoiler={onClickSpoiler}
                                                current={current}/>
                                        )
                                    })
                                    :<div style={{padding: "0 20px"}}>Устройств пока нет</div>
                                }
                            </div>
                        </div>}
                    </div>
                    <div className="section-map_items chart_white">
                        {current
                            ? <ContainerSectionMapPlot deviceId={current._id} isOpenBottom={isOpenBottom}/>
                            : <div className="data-title_gray">Данных пока нет</div>
                        }
                    </div>
                </div>
    )
}

export default BlockMapMain