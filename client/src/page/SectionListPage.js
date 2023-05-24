import React, {useState} from "react";

import SectionListContainer from "../components/SectionList/SectionListContainer";
import {SectionMap} from "../components/Section/SectionMap";
import {useSectionMap} from "../hooks/hookAPI/sectionMap.hook";
import {Loader} from "../components/UI/Loader";

const SectionListPage = () => {
    const [sectionId, setSectionId] = useState(null)
    const {section, loadingSection} = useSectionMap(sectionId)

    const changeSection = (sectionId) => {
        setSectionId(sectionId)
    }
    return (
        <div className="section-page">
            <div className="section-page__tit"><h2>Списки анкерных участков</h2></div>
            <div className="section-page__content">
                <SectionListContainer changeSection={changeSection} sectionCurrent={sectionId}/>
                <div className="section-page__device-list device-list">
                    {!loadingSection
                        ? <>
                            { sectionId && section && <div className="device-list__wrap">
                                <SectionMap section={section}/>
                            </div>
                        }</>
                        : <Loader/>
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionListPage