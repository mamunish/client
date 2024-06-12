import { renderToaster } from "./notificationUtils";


export const request = async (requestParams, showMessage = false, message) => {
    const { api, params, payload } = requestParams;
    try {
        const res = await api({ params, payload }) || {};
        if (res.status === 498) {
            renderToaster({ type: "error", message: "Session Time Out" })
        }
        if (res.status === 422) {
            renderToaster({ type: "error", message: res.data.error })
        }
        if(showMessage){
            renderToaster({ type: "success", message: res.data.message || message })
        }
        return res;

    } catch (error) {
        renderToaster({ type: "error", message: error?.error || error?.message || "Something went wrong" })
        console.error("Error in request: ", { ...requestParams, Error: error });
        return error
    }
};
