import Swal from "sweetalert2";

export const handleError = (message) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message ? message : "Something went wrong!"
    });
};
export const handleSuccess = (message) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message ? message : "Successful",
        showConfirmButton: false,
        timer: 1500
    });
};