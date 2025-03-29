// src/components/FilterSection.js
import React, { useState } from "react";

const FilterSection = ({ onFilter }) => {
  const [query, setQuery] = useState("");

  const handleFilterChange = (e) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search or filter files..."
        value={query}
        onChange={handleFilterChange}
      />
      <button onClick={() => onFilter(query)} style={{ marginLeft: "10px" }}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSection;
