import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function configure(timer, showProgressBar, position) {
    return {
        position: position || toast.POSITION.TOP_CENTER,
        autoClose: timer ? timer : 2000,
        hideProgressBar: showProgressBar ? false : true,
        transition: Slide,
        limit: 1,
        closeOnClick: true
    }
}
const Toast = {
    success(message, timer, showProgressBar, position) {
        toast.success(message, configure(timer, showProgressBar, position))
    },
    warn(message, timer, showProgressBar, position) {
        toast.warn(message, configure(timer, showProgressBar, position))
    },
    error(message, timer, showProgressBar, position) {
        toast.error(message, configure(timer, showProgressBar, position))
    },
    info(message, timer, showProgressBar, position) {
        toast.info(message, configure(timer, showProgressBar, position))
    }
}
export { Toast }
