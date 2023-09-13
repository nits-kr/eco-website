// import React, { useState } from "react";

// const CustomSwitch = ({ label, checked, onChange }) => {
//   const [isChecked, setIsChecked] = useState(checked || false);

//   const toggleSwitch = () => {
//     const newChecked = !isChecked;
//     setIsChecked(newChecked);
//     onChange && onChange(newChecked);
//   };

//   return (
//     <div className="custom-switch">
//       {label && <label>{label}</label>}
//       <div
//         className={`custom-switch-inner ${isChecked ? "active" : ""}`}
//         onClick={toggleSwitch}
//       >
//         <div className={`custom-switch-knob ${isChecked ? "active" : ""}`} />
//       </div>
//     </div>
//   );
// };

// export default CustomSwitch;

// import React from "react";
// // import "./ToggleSwitch.css";

// const CustomSwitch = ({ label }) => {
//   return (
//     <div className="container">
//       <label htmlFor="">
//         <strong>{label}</strong>
//       </label>
//       <div
//         className="toggle-switch"
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         <input type="checkbox" className="checkbox" name={label} id={label} />
//         <label className="label" htmlFor={label} style={{ margin: "0px" }}>
//           <span className="inner" />
//           <span className="switch" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CustomSwitch;

// import React, { useState } from "react";

// const CustomSwitch = ({ label }) => {
//   const [isChecked, setIsChecked] = useState(true); // Use state to track the checked state

//   const toggleSwitch = () => {
//     setIsChecked(!isChecked); // Toggle the checked state when clicked
//   };

//   return (
//     <div className="container">
//       <label htmlFor="">
//         <strong>{label}</strong>
//       </label>
//       <div
//         className="toggle-switch"
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         <input
//           type="checkbox"
//           className="checkbox"
//           name={label}
//           id={label}
//           checked={isChecked} // Use the state value
//           onChange={toggleSwitch} // Toggle the state when the input changes
//         />
//         <label className="label" htmlFor={label} style={{ margin: "0px" }}>
//           <span className="inner" />
//           <span className="switch" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CustomSwitch;

import React, { useState } from "react";

const CustomSwitch = ({ label, onContent, offContent }) => {
  const [isChecked, setIsChecked] = useState(true); // Use state to track the checked state
  console.log("isChecked", isChecked);

  const toggleSwitch = () => {
    setIsChecked(!isChecked); // Toggle the checked state when clicked
  };
  // Define CSS variables based on the props
  const switchStyles = {
    "--switch-label-on": `"${onContent}"`, // Content for "YES", "TRUE", or "MILES", etc.
    "--switch-label-off": `"${offContent}"`, // Content for "NO", "FALSE", "KM", etc.
  };

  return (
    <div className="container" style={switchStyles}>
      <label htmlFor="">
        <strong>{label}</strong>
      </label>
      <div
        className="toggle-switch"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <label className="label" htmlFor={label} style={{ margin: "0px" }}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default CustomSwitch;
