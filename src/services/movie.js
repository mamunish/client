import apiGateWay from "../utils/axiosGateWay"
import { appEndpoints } from "./endPoints"

export const getMovieWatchlist = async ({ params }) => {
    return await apiGateWay.get(appEndpoints.movie.getMovieWatchlist(params.id))
}

export const deleteWatchlist = async ({ params }) => {
    return await apiGateWay.delete(appEndpoints.movie.deleteMovieWatchlist(params.id))
}

export const createWatchlist = async ({ payload }) => {
    return await apiGateWay.post(appEndpoints.movie.createWatchList, payload)
}
