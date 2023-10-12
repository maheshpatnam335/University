import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Toast(message) {
    // const notify = () => toast("Wow so easy!");
    // if (message) {
    //     notify();
    // }
    return (
        <div>
            <ToastContainer toast={toast(message ? message : "Test")} autoClose={2500} closeButton={true} />
        </div>
    );
}