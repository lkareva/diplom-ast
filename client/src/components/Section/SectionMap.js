import React from 'react'
import {Link} from "react-router-dom";
import DeviceListContainer from "../DeviceList/DeviceListContainer";

export const SectionMap = ({ section }) => {
  return (
    <>
        <h2>{section.name}</h2>
        <div style={{paddingBottom: 20}}>Участок железной дороги: {section.from} {section.desc.from}-{section.desc.to} м.</div>
        <DeviceListContainer sectionId={section._id}/>
    </>
  )
}
