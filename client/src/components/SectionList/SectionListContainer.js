import React, {useRef, useState} from "react";
import {Loader} from "../UI/Loader";
import {SectionList} from "./SectionList";
import {useListSectionMap} from "../../hooks/hookAPI/listSectionMap.hook";
import useScroll from "../../hooks/scroll.hook";
import {usePosts} from "../../hooks/filter.hook";
import FilterSection from "../UI/FilterSection";

const SectionListContainer = ({changeSection, sectionCurrent}) => {
    const [current, setCurrent] = useState(1)
    const {listSection, loadingListSection, totalPages} = useListSectionMap(current)
    const parentRef = useRef()
    const childRef = useRef()
    const intersected = useScroll(loadingListSection, current < totalPages, parentRef, childRef, () => {
        setCurrent(prev => prev + 1)
    })

    const [filter, setFilter] = useState({sortFrom: 0, sortTo: 640000, query: ''})
    const sortedAndSearchedPosts = usePosts(listSection, filter.sortFrom, filter.sortTo, filter.query);


    return (
        <div className="section-page__section-list section-list">
            <FilterSection filter={filter} setFilter={setFilter}/>
            <div ref={parentRef} className="section-list__wrap">
                <SectionList sections={sortedAndSearchedPosts} changeSection={changeSection} sectionCurrent={sectionCurrent}/>
                <div ref={childRef} style={{height: 2, marginTop: -20}}/>
                {loadingListSection && <Loader/>}
            </div>
        </div>
    )
}

export default SectionListContainer