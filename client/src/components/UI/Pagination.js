import React, {useEffect, useState} from 'react'
import {genPages} from "../../utils/utils";

const Pagination = ({totalPage, current, changePage}) => {
    const [pageNav, setPageNav] = useState([])
    useEffect(() => {
        setPageNav(genPages(current,totalPage))
    }, [current, totalPage])
    return (
        <ul className="pagination">
            <li className="pagination__item" onClick={() => changePage(current, 'previous') }>
                <a className="pagination__link pagination__arrow-previous">&#8249;</a>
            </li>
            {pageNav.map(page => {
                return (
                    <li
                        onClick={() => changePage(Number(page))}
                        className={page === current ? 'pagination__item current' : 'pagination__item'}>
                        <a href className="pagination__link">{page}</a>
                    </li>
                );
            })}
            <li className="pagination__item" onClick={() => changePage(current, 'next')}>
                <a className="pagination__link pagination__arrow-next">&#8250;</a>
            </li>
        </ul>
    )
}

export default Pagination