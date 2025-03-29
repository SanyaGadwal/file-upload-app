// src/services/uploadService.js
export const uploadFile = async (file) => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    // Simulate backend API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`File uploaded successfully: ${file.name}`);
        resolve({ success: true, fileName: file.name });
      }, 1000); // Simulating a 1-second delay
    });
  };
  