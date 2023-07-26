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
import { VIDEOBASEURL } from './Constant';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    AccessKey: process.env.REACT_APP_ACCESS_KEY
    // process.env.REACT_APP_ACCESS_KEY
  }
};

export const fetchVideoData = async ({ page = 1, items = 10 }) => {
  const response = await axios.get(`${VIDEOBASEURL}library/140824/videos?page=${page}&itemsPerPage=${items}`, options);
  return response.data;
};
