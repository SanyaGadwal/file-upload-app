import React, { useState } from "react";

const UploadButton = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", file);
      onFileUploaded(file); 
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadButton;
