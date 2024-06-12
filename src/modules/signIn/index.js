import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "redux/userSlice";
import PasswordLogin from "./components/PasswordLogin";

const Login = () => {
    const dispatch = useDispatch();
    const onLoginSuccess = (user) => {
        if (user) {
            const profile = {
                email: user.email,
                userId: user.user_id,
                token: user.access,
                username: user.username
            }
            localStorage.setItem("isloggedin", JSON.stringify(profile))
            dispatch(setUserData(profile))
        }
    }

    useEffect(()  => {
        document.body.classList.add("bg-image");
    
        return () => {
            document.body.classList.remove("bg-image");
        };
    });


    return (
        <section>
            <div className="container-fluid  ">

                <PasswordLogin
                    onLoginSuccess={onLoginSuccess}
                />

            </div>

            <p className="text-center  fixed-bottom margin1  allrights_font py-2">Copyright © 2024 MOVIEBOX.All rights reserved.</p>

        </section>
    )
}

export default Login