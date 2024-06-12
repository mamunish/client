import React from "react";

export const components = {
    page404: React.lazy(() => import("components/common/Page404")),
    signIn: React.lazy(() => import("modules/signIn")),
    signUp: React.lazy(() => import("modules/register")),
    dashboard: React.lazy(() => import("modules/dashboard")),
    movieDetail: React.lazy(() => import("modules/movie")),
    watchList: React.lazy(() => import("modules/watchlist")),
};

