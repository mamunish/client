import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { renderToaster } from "utils/notificationUtils";
import images from "../../config/imageConfig"
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { request } from "utils";
import { addLoader, removeLoader } from "../../redux/commonSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createWatchlist, deleteWatchlist, getMovieWatchlist } from "services/movie";
import { Link } from "react-router-dom";
const { OMDB_API_KEY, OMDB_URL } = process.env;

function Index() {

    const [movie, setMovie] = useState({})

    const { movieId } = useParams();

    const dispatch = useDispatch();
    const getMovieDetail = async (id) => {
        let config = {
            method: 'get',
            url: `${OMDB_URL}?apikey=${OMDB_API_KEY}?apikey=d2d41cc2&i=${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        dispatch(addLoader("ACTION"))

        axios.request(config)
            .then((response) => {
                dispatch(removeLoader("ACTION"))
                if (response.data.Response === "False") {
                    renderToaster({ type: "error", message: response.data.Error })
                } else {
                    setMovie(response.data)
                }
            })
    }
    const [watchList, setWatchList] = useState({})
    const getSingleMovieWatchlist = async (id) => {
        const response = await request({ api: getMovieWatchlist, params: { id: id } })
        if (response.status == 200) {
            setWatchList(response.data)
        } 
    }
    const addToWatchlist = async () => {
        dispatch(addLoader("ACTION"))
        const data = {
            "movie_name": movie.Title,
            "movie_id": movie.imdbID
        }
        const response = await request({ api: createWatchlist, payload: data }, true, "Movie Successfully added to watchlist")
        if (response.status == 200) {
            getSingleMovieWatchlist(movie.imdbID)
            dispatch(removeLoader("ACTION"))
        } else {
            dispatch(removeLoader("ACTION"))
        }
    }
    const removeWatchlist = async () => {
        dispatch(addLoader("ACTION"))
        const response = await request({ api: deleteWatchlist, params: { id: watchList.id } }, true, "Movie Successfully removed to watchlist")
        if (response.status == 200) {
            getSingleMovieWatchlist(movie.imdbID)
            dispatch(removeLoader("ACTION"))
        } else {
            dispatch(removeLoader("ACTION"))
        }
    }
    useEffect(() => {
        getMovieDetail(movieId);
        getSingleMovieWatchlist(movieId)
    }, [movieId]);
    return (
        <>

            <div className="container">
                <div className="row">
                    <Col xs={6} md={4}>
                        {movie.Poster !== "N/A" &&
                            <Image src={movie.Poster} rounded />
                        }
                        {movie.Poster === "N/A" &&
                            <Image src={images.NO_IMG.path} rounded />
                        }
                    </Col>
                    <Col xs={12} md={8}>
                        <Card>
                            <Card.Header>{movie.Title}</Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {movie.Plot}{' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Release at  <cite title="Source Title">{movie.Released}</cite>
                                    </footer>
                                    <footer className="blockquote-footer">
                                        Actors <cite title="Source Title">{movie.Actors}</cite>
                                    </footer>
                                    <footer className="blockquote-footer">
                                        Written By <cite title="Source Title">{movie.Writer}</cite>
                                    </footer>
                                    <footer className="blockquote-footer">
                                        Directed by <cite title="Source Title">{movie.Director}</cite>
                                    </footer>
                                </blockquote>
                                <br></br>
                                {watchList.movie_name &&
                                    <Button onClick={removeWatchlist} variant="danger">Remove Watchlist</Button>
                                }
                                {!watchList.movie_name &&
                                    <Button onClick={addToWatchlist} variant="primary">Add to Watchlist</Button>
                                }
                                <Link to={'/'} style={{float: 'right'}}>Back</Link>                            
                            </Card.Body>
                        </Card>
                    </Col>
                    {movie === 0 &&
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