import React from "react";
import Swal from "sweetalert2";

// const handleClick = () => {
//     Swal.fire({
//         title: "Success",
//         type: "success",
//         text: "Your work has been saved."
//     });
// };
// const handleClick1 = (data) => {
//     Swal.fire({
//         title: "Thông báo",
//         text: "Bạn muốn đặt khám",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Đăng nhập",
//         cancelButtonText: "Hủy"
//     })
//         .then((result) => {
//             if (result.value) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Success",
//                     text: data.confirm
//                 });
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Cancel",
//                     text: data.cancel
//                 });
//             }
//         })
//         .catch((error) => {
//             Swal.fire({
//                 icon: "error",
//                 title: "Opps...",
//                 text: `Something went wrong!, ${error.message}`
//             });
//         });
// };
const handleClick12 = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
    });
};
const handleClickTop = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful",
        showConfirmButton: false,
        timer: 1500
    });
};
// const handleClickAutoClose = () => {
//     let timerInterval;
//     Swal.fire({
//         title: "Auto close alert!",
//         html: "I will close in <b></b> milliseconds.",
//         timer: 1000,
//         timerProgressBar: true,
//         onBeforeOpen: () => {
//             Swal.showLoading();
//             timerInterval = setInterval(() => {
//                 const content = Swal.getContent();
//                 if (content) {
//                     const b = content.querySelector("b");
//                     if (b) {
//                         b.textContent = Swal.getTimerLeft();
//                     }
//                 }
//             }, 100);
//         },
//         onClose: () => {
//             clearInterval(timerInterval);
//         }
//     }).then((result) => {
//         if (result.dismiss === Swal.DismissReason.timer) {
//             console.log("I was closed by the timer");
//         }
//     });
// };
const SweetAlert = {
    // handleClick,
    // handleClick1,
    handleClick12,
    // handleClickAutoClose,
    handleClickTop
};
export default SweetAlert;