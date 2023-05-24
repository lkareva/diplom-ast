import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthContext} from "./context/AuthContext"
import {useAuth} from "./hooks/auth.hook"
import {Navbar} from "./components/Navbar"
import {Loader} from "./components/UI/Loader"
import FrontPage from "./page/FrontPage"
import SectionListPage from "./page/SectionListPage"
import DevicePage from "./page/DevicePage"
import NotFoundPage from "./page/NotFoundPage"
import AuthPage from "./page/AuthPage"
import './style/style.css'
import 'materialize-css'
import {MyRoutes} from "./route/routes";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()
const App = () => {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated= !!token

    if (!ready) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{
                token, login, logout, userId, isAuthenticated
            }}>
                <QueryClientProvider client={queryClient}>
                    <MyRoutes />
                </QueryClientProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

export default App
