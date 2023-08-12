import React, { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router/routes";
import { AuthContext } from "../context/context";

const AppRouter = () => {
    const {authUser} = useContext(AuthContext);
    return (
        authUser
            ?
            <Routes>
                {privateRoutes.map(r =>
                    <Route path={r.path} element={r.component} exact={r.exact} key={r.path} />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(r =>
                    <Route path={r.path} element={r.component} exact={r.exact} key={r.path}/>
                )}

            </Routes>
    )
}

export default AppRouter