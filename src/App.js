import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "components/common/loader";
import AppRoutes from "./routes";
import toasterConfig from "./utils/notificationUtils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const loadersList = useSelector(store => store.commonReducer.loaderList)
    return (
        <Suspense fallback={""}>
            {loadersList.length ? <Loader /> : null}
            <ToastContainer theme="colored" {...toasterConfig} />
            <Router>
                <AppRoutes />
            </Router>
        </Suspense>
    );
}

export default App;
