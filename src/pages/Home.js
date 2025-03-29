// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FilterSection from "../components/FilterSection";
import UploadButton from "../components/UploadButton";
import "./Home.css"; // Import CSS for modern styling

const Home = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Load files from local storage on component mount
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (storedFiles) {
      setFiles(storedFiles);
      setFilteredFiles(storedFiles);
    }
  }, []);

  // Handle file upload
 const handleFileUpload = (file) => {
  if (!file) return;

  const fileName = file.name;
  const fileType = file.type.startsWith("image/") ? "image" : "file";
  const fileURL = fileType === "image" ? URL.createObjectURL(file) : null;

  const fileObj = {
    name: fileName,
    type: fileType,
    url: fileURL,
    date: new Date().getTime(),
  };

  const updatedFiles = [...files, fileObj];
  setFiles(updatedFiles);
  setFilteredFiles(updatedFiles);

  // Save to local storage
  localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
};


  // Handle file search/filtering
  const handleFilter = (query) => {
    const filtered = files.filter((file) =>
      file.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  // Handle file deletion
  const handleDelete = (fileName) => {
    const updatedFiles = files.filter((file) => {
      if (file.name === fileName && file.type === "image") {
        URL.revokeObjectURL(file.url); // Clean up blob URL
      }
      return file.name !== fileName;
    });

    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);

    // Update local storage
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  // Handle sorting
  const handleSort = (sortType) => {
    let sortedFiles = [...files];

    switch (sortType) {
      case "nameAsc":
        sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedFiles.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "dateAsc":
        sortedFiles.sort((a, b) => a.date - b.date);
        break;
      case "dateDesc":
        sortedFiles.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }

    setFilteredFiles(sortedFiles);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="upload-section">
        <FilterSection onFilter={handleFilter} />
        <UploadButton onFileUploaded={handleFileUpload} />
      </div>

      <div className="files-section">
        <h3>Uploaded Files:</h3>
        <div className="sort-section">
          <label htmlFor="sort" className="sort-label">
            Sort by:
          </label>
          <select
            className="sort-dropdown"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="dateAsc">Date Uploaded (Oldest)</option>
            <option value="dateDesc">Date Uploaded (Newest)</option>
          </select>
        </div>

        <ul className="file-list">
          {filteredFiles.map((file, index) => (
            <li key={index} className="file-item">
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="file-preview"
                />
              ) : (
                <span
                  role="img"
                  aria-label="file-icon"
                  className="file-icon"
                >
                  📄
                </span>
              )}
              <span className="file-name">{file.name}</span>
              <button
                className="delete-button"
                onClick={() => handleDelete(file.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
