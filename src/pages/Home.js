import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FilterSection from "../components/FilterSection";
import UploadButton from "../components/UploadButton";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (storedFiles) {
      setFiles(storedFiles);
      setFilteredFiles(storedFiles);
    }
  }, []);

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

  const handleFilter = (query) => {
    const filtered = files.filter((file) =>
      file.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  const handleDelete = (fileName) => {
    const updatedFiles = files.filter((file) => {
      if (file.name === fileName && file.type === "image") {
        URL.revokeObjectURL(file.url);
      }
      return file.name !== fileName;
    });

    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);

    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

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
    <div className="container">
      <Header />
      <FilterSection onFilter={handleFilter} />
      <UploadButton onFileUploaded={handleFileUpload} />
      <div style={{ marginTop: "20px" }}>
        <h3>Uploaded Files:</h3>
        <div>
          <label htmlFor="sort" style={{ marginRight: "10px" }}>
            Sort by:
          </label>
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="dateAsc">Date Uploaded (Oldest)</option>
            <option value="dateDesc">Date Uploaded (Newest)</option>
          </select>
        </div>

        <ul>
          {filteredFiles.map((file, index) => (
            <li key={index}>
              {file.type === "image" ? (
                <img src={file.url} alt={file.name} />
              ) : (
                <span role="img" aria-label="file-icon">
                  📄
                </span>
              )}
              {file.name}
              <button onClick={() => handleDelete(file.name)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
