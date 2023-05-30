import React, {useEffect, useState} from "react"
import {GeoJson, Map, ZoomControl} from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import ContainerBlockMapMain from "./BlockMapMain/ContainerBlockMapMain";
import SearchSection from "./SearchSection";
const storageName = 'sectionIdMap'
const MY_API_KEY = '8MSKbSOUAF2pGGRdLDJO'
const maptilerProvider = maptiler(MY_API_KEY, 'basic-v2-light')

export const Panel = ({sections}) => {
    const [anchor, setAnchor] = useState(sections[4]._id)
    const [isOpenBottom, setIsOpenBottom] = useState(false)
    const [center, setCenter] = useState([...sections[4].coordinates[0]].reverse())
    const [zoom, setZoom] = useState(12)

    useEffect(() => {
        setAnchor(JSON.parse(sessionStorage.getItem(storageName)) || sections[4]._id);
    }, [])

    useEffect(() => {
        sessionStorage.setItem(storageName, JSON.stringify(anchor))
    }, [anchor])

    const onAnchor = (id) => {
        setAnchor(id)
        const anchorActive = sections.find(item => item._id === id)
        setCenter([...anchorActive.coordinates[0]].reverse())
    }

    let geoJsonSamples = sections.map((section) => {
        if(section.coordinates){
            return  {
                type: "FeatureCollection",
                properties: { "id": section._id },
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: section.coordinates
                        }
                    },
                ],
            }
        }
        else {
            return {}
        }
    })

    return (
        <div className='map-box'>
            <svg  width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute'}}>
                <defs>
                    <marker
                        id="anchor-view"
                        viewBox="0 0 34 36"
                        refX="0"
                        refY="45"
                        markerWidth="5"
                        markerHeight="5"
                        orient="0deg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.91659 8.97221C9.91659 4.84286 13.0879 1.49536 16.9999 1.49536C20.9119 1.49536 24.0833 4.84286 24.0833 8.97221C24.0833 12.5894 21.6498 15.6067 18.4166 16.2995V28.412H15.5833V16.2995C12.3501 15.6067 9.91659 12.5894 9.91659 8.97221ZM16.9999 4.4861C14.6527 4.4861 12.7499 6.4946 12.7499 8.97221C12.7499 11.4498 14.6527 13.4583 16.9999 13.4583C19.3471 13.4583 21.2499 11.4498 21.2499 8.97221C21.2499 6.4946 19.3471 4.4861 16.9999 4.4861Z" fill="#ED3420"/>
                        <path d="M13.0221 22.6946L11.6388 23.0171C9.65512 23.4796 8.07674 24.1717 7.03163 24.9467C5.96132 25.7404 5.66659 26.4418 5.66659 26.9166C5.66659 27.2559 5.80726 27.6918 6.2781 28.214C6.7559 28.744 7.51422 29.2892 8.55967 29.7797C10.647 30.7589 13.6299 31.4027 16.9999 31.4027C20.37 31.4027 23.3529 30.7589 25.4402 29.7797C26.4856 29.2892 27.2439 28.744 27.7217 28.214C28.1926 27.6918 28.3333 27.2559 28.3333 26.9166C28.3333 26.4418 28.0385 25.7404 26.9682 24.9467C25.9231 24.1717 24.3447 23.4796 22.361 23.0171L20.9777 22.6946L21.5888 19.7742L22.9721 20.0967C25.1867 20.613 27.1499 21.4265 28.5969 22.4995C30.0188 23.5538 31.1666 25.0429 31.1666 26.9166C31.1666 28.2291 30.5937 29.3668 29.7742 30.2758C28.9616 31.1771 27.8527 31.9207 26.5909 32.5127C24.0636 33.6983 20.6715 34.3935 16.9999 34.3935C13.3283 34.3935 9.93622 33.6983 7.40894 32.5127C6.14709 31.9207 5.03823 31.1771 4.22565 30.2758C3.40612 29.3668 2.83325 28.2291 2.83325 26.9166C2.83325 25.0429 3.98108 23.5538 5.40289 22.4995C6.84989 21.4265 8.81318 20.613 11.0277 20.0967L12.411 19.7742L13.0221 22.6946Z" fill="#ED3420"/>
                    </marker>
                </defs>
            </svg>
            <div className="map">
                <Map
                    provider={maptilerProvider}
                    dprs={[1, 2]}
                    center={center}
                    zoom={zoom}
                    onBoundsChanged={({ center, zoom }) => {
                        setCenter(center)
                        setZoom(zoom)
                    }}
                    boxClassname="map__body"
                >
                    <ZoomControl style={{zIndex: 10}}/>
                    {geoJsonSamples.map((geoJsonSample) => {
                        return <GeoJson
                            key={geoJsonSample.properties.id}
                            data={geoJsonSample}
                            styleCallback={(feature, hover) => {
                                return hover
                                    ? anchor === geoJsonSample.properties.id ? { fill: 'none', strokeWidth: '10', stroke: '#ED3420',  strokeLinecap:'auto', strokeLinejoin:'round', markerStart: 'url(#anchor-view)'} : { fill: 'none', strokeWidth: '10', stroke: '#ED3420',  strokeLinecap:'auto', strokeLinejoin:'round'}
                                    : anchor === geoJsonSample.properties.id ? { fill: 'none', strokeWidth: '10', stroke: '#ED3420',  strokeLinecap:'auto', strokeLinejoin:'round', markerStart: 'url(#anchor-view)'} : { fill: 'none', strokeWidth: '10', stroke: '#282828',  strokeLinecap:'auto', strokeLinejoin:'round'}

                            }}
                            className={anchor === geoJsonSample.properties.id ? 'anchor anchor__current' : 'anchor'}
                            onClick={() =>onAnchor(geoJsonSample.properties.id)}
                        />
                    })}
                </Map>
            </div>
            <SearchSection className="search-main" sections={sections} onAnchor={onAnchor}/>
            <div className="bottom">
                <div className="section-map">
                    <div className={!isOpenBottom ? "section-map__is-open" : "section-map__is-open active"}>
                        <img src={require("../img/icon/arrow.svg")}
                             alt=""
                             onClick={()=> setIsOpenBottom(prev => !prev)}
                        />
                    </div>
                    <ContainerBlockMapMain sectionId={anchor} isOpenBottom={isOpenBottom}/>
                </div>
            </div>
        </div>
    )
}
