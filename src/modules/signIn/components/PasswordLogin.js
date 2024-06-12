import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoader, removeLoader } from "../../../redux/commonSlice";
import { Validate } from "utils/validation";
import { request } from "utils";
import { userLogin } from "services/user";
import { Link } from "react-router-dom";
import "../../../assets/css/login.css";

const PasswordLogin = (props) => {
    const { onLoginSuccess } = props
    const [userData, setUserDatas] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState({ username: "", password: "" })
    const dispatch = useDispatch();

    const isFormValid = () => {
        const temp = {}
        let isFormValid = true
        Object
            .keys(userData)
            .forEach(field => {
                const status = Validate(field, field, userData[field])
                temp[field] = status
                if (status)
                    isFormValid = false
            })
        setFormErrors(temp)
        return isFormValid
    }
    const checkAuthentication = async () => {
        if (!isFormValid()) {
            return null
        }
        const data = {
            username: userData.username,
            password: userData.password
        }
        dispatch(addLoader("ACTION"))
        const response = await request({ api: userLogin, payload: data }, true)
        if (response.status == 200) {
            onLoginSuccess(response.data, userData.username)
            dispatch(removeLoader("ACTION"))
        } else {
            dispatch(removeLoader("ACTION"))
        }
    } 

    return (
        <form className="mx-auto fontColor ">
            <p className="text-center fontColor">Welcome to MOVIEBOX</p>
            <p className="text-center titlesize pb-2">Please sign-in to your account </p>
            <div className="mb-3">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Username"
                    name="username"
                    value={userData.username}
                    onChange={(e) => (
                        setUserDatas({ ...userData, username: e.target.value }),
                        setFormErrors({ ...formErrors, username: Validate("username", "username", e.target.value) })
                    )
                    }
                />
                <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.username}</span>
            </div>
            <div className="mb-3">
                <input type="password" id="inputPassword5" className="form-control" placeholder="Enter Password" aria-describedby="passwordHelpBlock"
                    name="email"
                    value={userData.password}
                    onChange={(e) => (
                        setUserDatas({ ...userData, password: e.target.value }),
                        setFormErrors({ ...formErrors, password: Validate("password", "password", e.target.value) })
                    )}
                />
                <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.password}</span>
            </div>

            <div className="text-center pt-3">
                <button type="button" className="button1 px-5 " onClick={checkAuthentication}>Login
                    
                </button>
                
            </div>
            <div className="text-center pt-3">
            <Link to={'/register'} className="loginbtn1 " >Register</Link>  
            </div>
            
        </form>



    )
}

export default PasswordLogin