import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { request } from "utils";
import { addLoader, removeLoader } from "../../redux/commonSlice";
import { deleteWatchlist } from "services/movie";
import { watchList } from "services/user";
import Table from 'react-bootstrap/Table';

function Index() {



    const dispatch = useDispatch();
    
    const [watchLists, setWatchLists] = useState([])
    const getUserWatchList = async () => {
        dispatch(addLoader("ACTION"))
        const response = await request({ api: watchList})
        if (response.status == 200) {
            setWatchLists(response.data)
            dispatch(removeLoader("ACTION"))
        } else {
            dispatch(removeLoader("ACTION"))
        }
    } 
    
    const removeWatchlist = async (id) => {
        dispatch(addLoader("ACTION"))
        const response = await request({ api: deleteWatchlist,  params: { id: id} }, true, "Movie Successfully removed to watchlist")
        if (response.status == 200) {
            getUserWatchList()
            dispatch(removeLoader("ACTION"))
        } else {
            dispatch(removeLoader("ACTION"))
        }
    } 
    useEffect(() => {
        getUserWatchList()
    }, []);
    return (
        <>

            <div className="container">
                <div className="row">
                <div className="col-12" >
                <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Movie Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

                {watchLists.map((movie, index) => (             
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{movie.movie_name}</td>
          <td><Button onClick={() =>removeWatchlist(movie.id)} variant="danger">Remove Watchlist</Button></td>
        </tr>                
                    ))}
                     </tbody>
    </Table>
                    </div>
                    {watchLists.length === 0 &&
                        <Card className="text-center">
                            <Card.Header>Movie WatchList</Card.Header>
                            <Card.Body>
                                <Card.Title>No Data Found</Card.Title>
                            </Card.Body>
                        </Card>
                    }

                </div>
            </div>
        </>
    )
}

export default Index;