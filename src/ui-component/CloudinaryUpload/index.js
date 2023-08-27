import { Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import ButtonComponent from 'ui-component/ButtonComponent';

const CloudinaryUploadWidget = ({ onUploadSuccess, text }) => {
  const [res, setRes] = useState('');

  const addWidget = (e) => {
    console.log(process.env);
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
        // ...other configuration options...
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          setRes(result.info.secure_url);
          // Call the callback function with the result
          if (onUploadSuccess) {
            onUploadSuccess(result);
          }
        }
      }
    );
    e.preventDefault();
    myWidget.open();
    console.log(myWidget.__proto__);
  };

  return (
    <BoxComponent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', pt: '10px' }}>
      <ButtonComponent sx={{ width: '180px', height: '40px', border: '1px #364152 solid', borderRadius: '12px' }} onClick={addWidget}>
        {text}
      </ButtonComponent>
      <Typography>{res}</Typography>
    </BoxComponent>
  );
};

export default CloudinaryUploadWidget;
