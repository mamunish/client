import React from "react"
import { components } from "./components";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useSelector } from "react-redux";

const appRoutes = () => {
    const { REACT_APP_SESSION_TYPE } = process.env;
    let userData = null
    if (REACT_APP_SESSION_TYPE === "RETAIN") {
        const local = localStorage.getItem("isloggedin") || false;
        const data = JSON.parse(local)
        userData = data;
    } else {
        userData = useSelector((state) => state.userReducer.profile);
    }
    const isLoggedIn = userData?.token


    return [
        {
            path: "*",
            element: (
                <PublicRoute isLoggedIn={isLoggedIn}>
                    <components.page404 />
                </PublicRoute>
            ),
        },
        {
            path: "/sign-in",
            element: <PublicRoute isLoggedIn={isLoggedIn}>
                <components.signIn />
            </PublicRoute>,
        },
        {
            path: "/register",
            element: <PublicRoute isLoggedIn={isLoggedIn}>
                <components.signUp />
            </PublicRoute>,
        },
        {
            path: "/",
            element: (
                <PrivateRoute isLoggedIn={isLoggedIn}>
                    <components.dashboard />
                </PrivateRoute>
            ),
        },
        {
            path: "/dashboard",
            element: (
                <PrivateRoute isLoggedIn={isLoggedIn}>
                    <components.dashboard />
                </PrivateRoute>
            ),
        },
        {
            path: "/movie-detail/:movieId",
            element: (
                <PrivateRoute isLoggedIn={isLoggedIn}>
                    <components.movieDetail />
                </PrivateRoute>),
        },
        {
            path: "/watchlist",
            element: (
                <PrivateRoute isLoggedIn={isLoggedIn}>
                    <components.watchList />
                </PrivateRoute>),
        },
    ];
};

export default appRoutes;
