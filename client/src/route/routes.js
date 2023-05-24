import {Navbar} from "../components/Navbar";
import {Route, Routes} from "react-router-dom";
import FrontPage from "../page/FrontPage";
import SectionListPage from "../page/SectionListPage";
import DevicePage from "../page/DevicePage";
import NotFoundPage from "../page/NotFoundPage";
import AuthPage from "../page/AuthPage";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import ManualPage from "../page/ManualPage";
import AccountPage from "../page/AccountPage";

export const MyRoutes = ({}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <>
            {isAuthenticated && <>
                <Navbar/>
                <main>
                    <Routes>
                        <Route path="/" exact element={<FrontPage/>}/>
                        <Route path="/manual" exact element={<ManualPage/>}/>
                        <Route path="/account" exact element={<AccountPage/>}/>
                        <Route path="/section-map-devices" exact element={<SectionListPage/>}/>
                        <Route path="/section-map-devices/:idDevice" element={<DevicePage/>}/>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </>}
            {!isAuthenticated && <>
                <Routes>
                    <Route path="/" exact element={<AuthPage/>}/>
                    <Route path="*" element={<AuthPage />} />
                </Routes>
            </>}
        </>
    )
}