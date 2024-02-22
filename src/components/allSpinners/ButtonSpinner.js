import React from "react";
// import Loadings from "../Loadings.gif";
import loading from "../loading.gif";

function ButtonSpinner() {
  return (
    <>
      <div className={"text-center"}>
        <img className="" src={loading} alt="loading" />
      </div>
    </>
  );
}

export default ButtonSpinner;
