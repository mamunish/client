import apiGateWay from "../utils/axiosGateWay"
import { appEndpoints } from "./endPoints"

export const userLogin = async ({ payload }) => {
    return await apiGateWay.post(appEndpoints.user.userLogin, payload)
}

export const userRegiter = async ({ payload }) => {
    return await apiGateWay.post(appEndpoints.user.userRegiter, payload)
}

export const watchList = async () => {
    return await apiGateWay.get(appEndpoints.user.watchList)
}


