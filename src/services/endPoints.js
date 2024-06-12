


export const appEndpoints = {   
    user: {
        userLogin: "/login",
        watchList: `/watchlist/users`,
        userRegiter: "/register"
    },
    movie: {
        getMovieWatchlist: (id) => {
            return `/watchlist/movie/${id}`
        },
        createWatchList: "/watchlist/create",
        deleteMovieWatchlist: (id) => {
            return `/watchlist/${id}/delete`
        },
    }    
}