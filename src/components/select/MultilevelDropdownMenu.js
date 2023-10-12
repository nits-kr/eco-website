import React, { useState } from "react";
// import "./styles.css"; // Import your CSS file
import "./select.css"

function MultilevelDropdownMenu() {
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectionChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <label htmlFor="menu">Select an item:</label>
      <select id="menu" value={selectedItem} onChange={handleSelectionChange}>
        <option value="">Select</option>
        <optgroup label="Level 1">
          <option value="level1-item1">Level 1 - Item 1</option>
          <option value="level1-item2">Level 1 - Item 2</option>
          <option value="level1-item3">Level 1 - Item 3</option>
          <option value="level1-item4">Level 1 - Item 4</option>
          <option value="level1-item5">Level 1 - Item 5</option>
        </optgroup>
        <optgroup label="Level 2 - Item 1">
          <option value="level2-item1">Level 2 - Subitem 1</option>
          <option value="level2-item2">Level 2 - Subitem 2</option>
          <option value="level2-item3">Level 2 - Subitem 3</option>
          <option value="level2-item4">Level 2 - Subitem 4</option>
          <option value="level2-item5">Level 2 - Subitem 5</option>
        </optgroup>
        <optgroup label="Level 3 - Item 1">
          <option value="level3-item1">Level 3 - Subitem 1</option>
          <option value="level3-item2">Level 3 - Subitem 2</option>
          <option value="level3-item3">Level 3 - Subitem 3</option>
          <option value="level3-item4">Level 3 - Subitem 4</option>
          <option value="level3-item5">Level 3 - Subitem 5</option>
        </optgroup>
      </select>
    </div>
  );
}

export default MultilevelDropdownMenu;
