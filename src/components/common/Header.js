import React from "react"
import images from "../../config/imageConfig"
import { setUserData } from "../../redux/userSlice"
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userReducer.profile);

    const signOut = () => {
        let profile = {
            email: "",
            userId: "",
            feeRole: "",
            token: ""
        }
        dispatch(setUserData(profile))
        localStorage.removeItem("isloggedin");
        window.location.reload()
    }
    const handleWatchListClick = (event, page) => {
        event.preventDefault()
        navigate(page)
    }

    return (
        <header className="header bgNav">
            <div className="header__container">
                <a className="navbar-brand" href="#">MOVIEBOX</a>
                <span className="header__container1 menu_align " >
                    <ul className="navbar-nav profile menufont">
                        <li className="nav-item d">
                            <a className="nav-link  " href="#" data-bs-toggle="dropdown"><img src={images.PROFILE_1.path} alt="Concept BIU Logo" className="header__img" /></a>
                        </li>
                    </ul>
                    <NavDropdown title={userData.username} id="collapsible-nav-dropdown">
                        <NavDropdown.Item onClick={(e) =>handleWatchListClick(e, "/")}>
                            Movie List
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={(e) =>handleWatchListClick(e, "/watchlist")}>
                            Watch List
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
                    </NavDropdown>
                </span>
                <div className="header__toggle ps-2">
                    <i className='bx bx-menu' id="header-toggle"></i>
                </div>
            </div>
        </header>
    )
}

