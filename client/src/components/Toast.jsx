import React, { useState } from "react";
import "./Toast.css";

const Toast = ({msg, launchToast, toast}) => {

  return (
    <div>
      <div id="toast" className = {`${toast ? "show" : ""}`}>
        <div id="img">Hi..!!</div>
        <div id="desc">{msg}</div>
      </div>
    </div>
  );
};

export default Toast;
