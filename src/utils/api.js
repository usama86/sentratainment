// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       AccessKey: '0615e47a-209e-41d0-9bfdeb91cb45-7e88-444b'
//     }
//   };

//   fetch('https://video.bunnycdn.com/library/140824/videos?page=1&itemsPerPage=10', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

import axios from 'axios';
import { AUDIOBASEURL, VIDEOBASEURL } from './Constant';

const options = (type) => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    AccessKey: type === 'video' ? process.env.REACT_APP_VIDEO_ACCESS_KEY || process.env.REACT_APP_USER_KEY : process.env.REACT_APP_USER_KEY
  }
});

export const fetchVideoData = async ({ page = 1, items = 10 }) => {
  const response = await axios.get(
    `${VIDEOBASEURL}library/${process.env.REACT_APP_VIDEO_LIBRARY}/videos?page=${page}&itemsPerPage=${items}`,
    options('video')
  );
  return response.data;
};

export const fetchAudioData = async ({ page = 1, items = 10 }) => {
  const response = await axios.get(`${AUDIOBASEURL}storagezone?page=${page}&perPage=${items}`, options('audio'));
  return response.data;
};

export const UploadVideo = async (ID, file) => {
  const url = `${VIDEOBASEURL}library/${process.env.REACT_APP_VIDEO_LIBRARY}/videos/30bf821a-aaae-422f-a3e2-cfb73126f22d?enabledResolutions=true`;
  const formData = new FormData();
  formData.append('files', file); // Append the file to the form data
  const options = {
    method: 'PUT',
    data: formData,
    headers: {
      accept: 'application/json',
      AccessKey: process.env.REACT_APP_VIDEO_ACCESS_KEY
    }
  };

  try {
    const response = await axios(url, options);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// const optionss = {
//   method: 'PUT',
//   headers: {
//     accept: 'application/json',
//     AccessKey: process.env.REACT_APP_VIDEO_ACCESS_KEY
//   }
// };

// fetch('https://video.bunnycdn.com/library/140824/videos/69?enabledResolutions=true', options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
