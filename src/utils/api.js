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
import { AUDIOBASEURL, VIDEOBASEURL, SENTERTAINMENT_DB } from './Constant';

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
  const uploadOptions = {
    url: `${VIDEOBASEURL}library/${process.env.REACT_APP_VIDEO_LIBRARY}/videos/45b3bbb0-ef17-4be3-8520-88fa1ba248bd`,
    data: file,
    headers: {
      AccessKey: process.env.REACT_APP_VIDEO_ACCESS_KEY,
      'Content-Type': 'application/octet-stream'
    }
  };

  const uploadResponse = await axios.put(uploadOptions.url, uploadOptions.data, {
    headers: uploadOptions.headers
  });

  if (uploadResponse.status === 200) {
    console.log('Video uploaded successfully');
  } else {
    console.error('Failed to upload video content');
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

// const config = (method = 'get', url) => {
//   let config = {
//     method: method,
//     maxBodyLength: Infinity,
//     url: `${SENTERTAINMENT_DB}${url}`,
//     headers: {}
//   };
//   return config;
// };

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/user/allUser/`);
    return response?.data?.user;
  } catch (e) {
    console.log(e);
  }
};

export const getAllFood = async () => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/food/getfood/?type=simple`);
    return response?.data?.foodObj;
  } catch (e) {
    console.log(e);
  }
};

export const getUserOrder = async (id) => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/order/getUserOrder?_id=${id}`);
    return response?.data?.order;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrder = async () => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/order/getAllOrder`);
    return response?.data?.order;
  } catch (e) {
    console.log(e);
  }
};

export const getAllTypes = async () => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/food/gettype`);
    return response?.data?.type;
  } catch (e) {
    console.log(e);
  }
};

export const addUserApi = async (data) => {
  try {
    const response = await axios.post(`${SENTERTAINMENT_DB}/api/user/`, data);
    console.log(response.data.message);
    return response.data.message;
  } catch (e) {
    console.log(e.response.data.message);
    return e.response.data.message;
  }
};

export const editUserApi = async (data, id) => {
  try {
    const response = await axios.put(`${SENTERTAINMENT_DB}/api/user/editUser?userId=${id}`, data);
    console.log(response.data);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data);
    return e.response.data.resultCode;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/user/deleteUser?userId=${id}`);
    console.log(response.data);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data);
    return e.response.data.resultCode;
  }
};

export const addFoodType = async (data) => {
  try {
    const response = await axios.post(`${SENTERTAINMENT_DB}/api/food/addtype`, data);
    console.log(response.data.resultCode);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data.resultCode);
    return e.response.data.resultCode;
  }
};

export const addFood = async (data) => {
  try {
    const response = await axios.post(`${SENTERTAINMENT_DB}/api/food/addfood`, data);
    console.log(response.data.resultMessage.en);
    return response.data.resultMessage.en;
  } catch (e) {
    console.log(e.response.data.resultMessage.en);
    return e.response.data.resultMessage.en;
  }
};

export const editFood = async (id, data) => {
  try {
    const response = await axios.put(`${SENTERTAINMENT_DB}/api/food/editfood?Id=${id}`, data);
    console.log(response.data.resultCode);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data.resultCode);
    return e.response.data.resultCode;
  }
};

export const deleteFoodApi = async (id) => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/food/deletefood?Id=${id}`);
    console.log(response.data);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data);
    return e.response.data.resultCode;
  }
};

export const getAllMedia = async () => {
  try {
    const response = await axios.get(`${SENTERTAINMENT_DB}/api/media/getmedia`);
    return response?.data?.media;
  } catch (e) {
    console.log(e);
  }
};

export const addMedia = async (data) => {
  try {
    const response = await axios.post(`${SENTERTAINMENT_DB}/api/media/createmedia`, data);
    console.log(response.data.resultMessage.en);
    return response.data.resultMessage.en;
  } catch (e) {
    console.log(e.response.data.resultMessage.en);
    return e.response.data.resultMessage.en;
  }
};

export const editMedia = async (id, data) => {
  try {
    const response = await axios.put(`${SENTERTAINMENT_DB}/api/media/editmedia?id=${id}`, data);
    console.log(response.data.resultCode);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data.resultCode);
    return e.response.data.resultCode;
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await axios.put(`${SENTERTAINMENT_DB}/api/media/deletemedia?id=${id}`);
    console.log(response.data);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data);
    return e.response.data.resultCode;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${SENTERTAINMENT_DB}/api/user/login`, data);
    console.log(response.data.resultCode);
    return response.data.resultCode;
  } catch (e) {
    console.log(e.response.data.resultCode);
    return e.response.data.resultCode;
  }
};
