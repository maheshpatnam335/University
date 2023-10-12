import React from "react";
import SweetAlert from "../../utils/sweetAlert";
import "./style.scss";

function Item(props) {
  const data = {
    isLogged: true,
    url: "#",
    confirm: "Chuyen toi trang dang nhap",
    cancel: "Khong dang nhap"
  };
  return (
    <div className="item">
      <div className="item__sweet">
        <button
          className="item__sweet--button"
          onClick={SweetAlert.handleClick}
        >
          Success
        </button>
        <button
          className="item__sweet--button"
          onClick={SweetAlert.handleClick12}
        >
          Top Side
        </button>
        <button
          className="item__sweet--button"
          onClick={SweetAlert.handleClickTop}
        >
          Auto Close
        </button>
      </div>
    </div>
  );
}
export default Item;
