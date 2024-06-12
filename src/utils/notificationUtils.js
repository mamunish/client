
import { toast, Zoom } from "react-toastify"
// https://fkhadra.github.io/react-toastify/introduction
const toasterConfig = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 10000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtlfalse: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    icon: true,
    theme: 'light',
    transition: Zoom 
}
/*
@params
    type: 'info' | 'error' | 'success' | 'warn',
    message: string
*/
export const renderToaster = (props) => {
    const { type = undefined, message = "" } = props;
    if (type) {
        toast[type](message, { toastId: "customId" })
    } else {
        toast(message, { toastId: "customId" })
    }

}


export default toasterConfig