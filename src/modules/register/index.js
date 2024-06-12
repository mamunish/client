import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLoader, removeLoader } from "redux/commonSlice";
import { ValidateUser } from "utils/validation/userValidate";
import { request } from "utils";
import { userRegiter } from "services/user";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
function Index()  {
    const dispatch = useDispatch();

    const [userData, setUserDatas] = useState({ username: "", password: "", email: "", first_name:"", last_name: "" });
    const [formErrors, setFormErrors] = useState({ username: "", password: "", email: "", first_name:"", last_name: "" })

    const isFormValid = () => {
        const temp = {}
        let isFormValid = true
        Object
            .keys(userData)
            .forEach(field => {
                const status = ValidateUser(field, field, userData[field])
                temp[field] = status
                if (status)
                    isFormValid = false
            })
        setFormErrors(temp)
        return isFormValid
    }
    const registerUser = async () => {
        if (!isFormValid()) {
            return null
        }
        const data = {
            username: userData.username,
            password: userData.password,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name
        }
        dispatch(addLoader("ACTION"))
        dispatch(removeLoader("ACTION"))
        const response = await request({ api: userRegiter, payload: data }, true, "User Register Successfully")
        if (response.status == 200) {
            dispatch(removeLoader("ACTION"))
            setUserDatas({ username: "", password: "", email: "", first_name:"", last_name: "" })
        } else {
            dispatch(removeLoader("ACTION"))
        }
    } 

    useEffect(() => {
        document.body.classList.add("bg-image");

        return () => {
            document.body.classList.remove("bg-image");
        };
    });


    return (
        <section>
            <div className="container-fluid  ">

                <form className="mx-auto fontColor ">
                    <p className="text-center fontColor">Welcome to MOVIEBOX</p>
                    <p className="text-center titlesize pb-2">Please sign-up to your account </p>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleFormControlInput1f" placeholder="Enter Firstname"
                            name="first_name"
                            value={userData.first_name}
                            onChange={(e) => (
                                setUserDatas({ ...userData, first_name: e.target.value }),
                                setFormErrors({ ...formErrors, first_name: ValidateUser("first_name", "first_name", e.target.value) })
                            )
                            }
                        />
                        <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.first_name}</span>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleFormControlInput1l" placeholder="Enter Lastname"
                            name="last_name"
                            value={userData.last_name}
                            onChange={(e) => (
                                setUserDatas({ ...userData, last_name: e.target.value }),
                                setFormErrors({ ...formErrors, last_name: ValidateUser("last_name", "last_name", e.target.value) })
                            )
                            }
                        />
                        <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.last_name}</span>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleFormControlInput0" placeholder="Enter Email"
                            name="email"
                            value={userData.email}
                            onChange={(e) => (
                                setUserDatas({ ...userData, email: e.target.value }),
                                setFormErrors({ ...formErrors, email: ValidateUser("email", "email", e.target.value) })
                            )
                            }
                        />
                        <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.email}</span>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Username"
                            name="username"
                            value={userData.username}
                            onChange={(e) => (
                                setUserDatas({ ...userData, username: e.target.value }),
                                setFormErrors({ ...formErrors, username: ValidateUser("username", "username", e.target.value) })
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
                                setFormErrors({ ...formErrors, password: ValidateUser("password", "password", e.target.value) })
                            )}
                        />
                        <span style={{ color: "red", fontSize: "x-small" }}>{formErrors.password}</span>
                    </div>

                    <div className="text-center pt-3">
                        <button type="button" className="button1 px-5 " onClick={registerUser}>Register
                        </button>

                    </div>
                    <div className="text-center pt-3">
                        <Link to={'/sign-in'} className="loginbtn1 " >Login</Link>
                    </div>

                </form>

            </div>

            <p className="text-center  fixed-bottom margin1  allrights_font py-2">Copyright © 2024 MOVIEBOX.All rights reserved.</p>

        </section>
    )
}

export default Index