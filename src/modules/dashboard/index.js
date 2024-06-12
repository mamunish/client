import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { renderToaster } from "utils/notificationUtils";
import images from "../../config/imageConfig"

import { addLoader, removeLoader } from "../../redux/commonSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Index() {

    const [movieName, setMovieName] = useState("");
    const [movieList, setMovieList] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchMovie = async () => {

        if (movieName === "") {
            renderToaster({ type: "warning", message: "Please enter movie name" });
            return false;
        }

        let config = {
            method: 'get',
            url: `https://www.omdbapi.com/?apikey=d2d41cc2&s=${movieName}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        dispatch(addLoader("ACTION"))

        axios.request(config)
            .then((response) => {
                console.log("response.data", response.data)
                dispatch(removeLoader("ACTION"))
                if (response.data.Response === "False") {
                    renderToaster({ type: "error", message: response.data.Error })
                } else {
                    setMovieList(response.data.Search)
                }
            })
    }
    const handleMenuClick = (event, menu) => {
        event.preventDefault()
        navigate(menu)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center pt-5"> Welcome to MOVIEBOX</h1>
                            <div className="input-group px-2">
                                <input type="search" onChange={(e) => setMovieName(e.target.value)} className="form-control dropdown-toggle search_th fontssize" placeholder="Search movie name..." id="top-search" />
                                <Button variant="primary" onClick={searchMovie}>Search</Button>
                            </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="row">
                    {movieList.map((movie, index) => (
                        <div className="col-3" key={index}>
                            <Card
                                bg="dark"
                                text="white"
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Header>{movie.Type}</Card.Header>
                                {movie.Poster !== "N/A" &&
                                    <Card.Img variant="top" style={{ height: "375px" }} src={movie.Poster} />
                                }
                                {movie.Poster === "N/A" &&
                                    <Card.Img variant="top" style={{ height: "375px" }} src={images.NO_IMG.path} />
                                }
                                <Card.Body>
                                    <Card.Title>{movie.Title} </Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Link onClick={(ev) => handleMenuClick(ev, `/movie-detail/${movie.imdbID}`)}>View</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    {movieList.length === 0 &&
                        <Card className="text-center">
                            <Card.Header>Movie List</Card.Header>
                            <Card.Body>
                                <Card.Title>No Data Found</Card.Title>
                                <Card.Text>Use Search for better result.</Card.Text>
                            </Card.Body>
                        </Card>
                    }

                </div>
            </div>
        </>
    )
}

export default Index;