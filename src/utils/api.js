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

// export const fetchAudioData = async ({ page = 1, items = 10 }) => {
//   const response = await axios.get(`${AUDIOBASEURL}storagezone?page=${page}&perPage=${items}`, options('audio'));
//   return response.data;
// };
// {{Base_URL}}
