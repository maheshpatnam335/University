import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AlertSuccess = (message) => toast(message ? message : "Saved Successfully...",
    {
        transition: Slide,
        autoClose: 2500,
        closeButton: true,
        position: "bottom-center",
        type: "success"
    }
)
export const AlertError = ({ message }) => toast(message ? message : "Getting error", {
    transition: Slide,
    autoClose: 2500,
    position: "bottom-center",
    type: 'error'
})
