import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/UI/Loader";
import {Panel} from "../components/Panel";
import {useListSectionMapAll} from "../hooks/hookAPI/listSectionMapAll.hook";

const FrontPage = () => {
    const {listSectionAll, loadingListSectionAll} = useListSectionMapAll()

    return (
        <>
            {!loadingListSectionAll
                ? <> {!listSectionAll.length
                    ? <div>Анкерных участков пока нет</div>
                    : <Panel sections={listSectionAll}/>}
                </>
                : <Loader/>
            }
        </>
    )
}

export default FrontPage