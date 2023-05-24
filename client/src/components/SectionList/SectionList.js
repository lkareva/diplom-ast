import React from 'react'

export const SectionList = ({sections, changeSection, sectionCurrent}) => {
    return (
            <>
                { !sections.length
                    ? <p className="center">Анкерных участков пока нет</p>
                    : sections.map( (section) =>
                        <div key={section._id} className="section-list__item item-section-list">
                            <div className={sectionCurrent === section._id ? "item-section-list__wrap active": "item-section-list__wrap"} onClick={() => changeSection(section._id)}>
                                <div className="item-section-list__name">{section.name}</div>
                                <div className="item-section-list__km">{section.desc.from}-{section.desc.to} м.</div>
                            </div>
                        </div>
                    )
                }
            </>
    )
}
