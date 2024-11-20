import React from "react";

const ConfigPanel = ({ setItemCount, setGridColumns }) => {
  return (
    <div className="config-panel">
      <h2>Connect group of 2 words by clicking on related words</h2>
      <div>
        <label htmlFor="itemCount">Item Count:</label>
        <select
          id="itemCount"
          onChange={(e) => setItemCount(parseInt(e.target.value))}
        >
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>
      </div>
      <div>
        <label htmlFor="gridColumns">Grid Columns:</label>
        <select
          id="gridColumns"
          onChange={(e) => setGridColumns(parseInt(e.target.value))}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );
};

export default ConfigPanel;
