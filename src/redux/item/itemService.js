import axios from "axios";

const apiUrl = "/items";

export const getAll = () => {
  return axios
    .get(apiUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getOne = (id) => {
  return axios
    .get(`${apiUrl}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const create = (data) => {
  return axios
    .post(apiUrl, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const update = (data) => {
  return axios
    .put(`${apiUrl}/${data._id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const remove = (id) => {
  return axios
    .delete(`${apiUrl}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
