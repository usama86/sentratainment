import { Button, Stack, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import uniqid from 'uniqid';
import { UploadVideo } from 'utils/api';

const AddMovie = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    console.log(uniqid());
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file to upload.');
      return;
    }
    const fileNameWithoutSpaces = selectedFile.name.replace(/\s/g, '');
    console.log(fileNameWithoutSpaces);
    setIsUploading(true);

    // // Simulate an API call to upload the file
    // setTimeout(() => {
    //   // Replace this with your actual API endpoint for file upload
    //   // For example, you can use axios or fetch to make the actual API call
    //   console.log('Uploading file:', selectedFile.name);
    //   setIsUploading(false);
    //   setSelectedFile(null);
    //   alert('File uploaded successfully!');
    // }, 2000);

    try {
      await UploadVideo(uniqid(), selectedFile);
      setIsUploading(false);
      setSelectedFile(null);
      alert('File uploaded successfully!');
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert('Error uploading file.');
    }
  };

  return (
    <Stack sx={{ flexDirection: 'column', gap: '20px' }}>
      <input type="file" accept=".mp4" onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
      <Stack sx={{ gap: '10px' }} flexDirection="row">
        <TextField value={selectedFile?.name?.replace(/\s/g, '')} disabled sx={{ width: '240px' }} />
        <Button
          sx={{
            height: '44px',
            width: '120px',
            borderRadius: '16px',
            padding: '10px 20px 10px 20px',
            color: '#132640',
            background: '#FFFFFF',
            border: '1px solid #C5C7D4',
            alignSelf: 'flex-end'
          }}
          onClick={() => inputRef.current.click()}
        >
          Choose file
        </Button>
      </Stack>

      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        sx={{
          height: '44px',
          width: '180px',
          borderRadius: '16px',
          padding: '10px 20px 10px 20px',
          color: '#132640',
          background: '#FFFFFF',
          border: '1px solid #C5C7D4'
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Stack>
  );
};

export default AddMovie;
