import React from "react";
import "../allSpinners/spinner.css";

function FadeSpinner() {
  return (
    <>
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </>
  );
}

export default FadeSpinner;
