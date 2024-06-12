import React from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/common/Header";
const PrivateRoute = (props) => {
    const { children, isLoggedIn } = props
    return isLoggedIn
        ? <>
            <Header />
            <div className=""></div>
            {children}
        </>
        : <Navigate to="/sign-in" />
}

export default PrivateRoute;
