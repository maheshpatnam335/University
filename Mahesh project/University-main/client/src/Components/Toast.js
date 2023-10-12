import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const alertError = (message) => toast(message ? message : "Invalid", {
    transition: Slide,
    closeButton: true,
    autoClose: 2500,
    position: 'bottom-center',
    type: 'error'
});

export const alertSuccess = (message) => toast(message ? message : "Data saved successfully!", {
    transition: Slide,
    closeButton: true,
    autoClose: 2500,
    position: 'bottom-center',
    type: 'success'
});
