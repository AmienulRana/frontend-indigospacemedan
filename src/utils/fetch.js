import axios from "axios";
import { getToken } from "./storage";
const Token = "Bearer " + getToken();
const UrlApi = "http://localhost:3000/";
export function getApi(url) {
  return axios({
    method: "get",
    url: UrlApi + url,
    headers: {
      Authorization: Token,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function addApi(url, data) {
  return axios({
    method: "post",
    url: UrlApi + url,
    headers: {
      Authorization: Token,
    },
    data: data,
  }).then((res) => res.data);
}

export function deleteApi(url) {
  return axios({
    method: "delete",
    url: UrlApi + url,
    headers: {
      Authorization: Token,
    },
  }).then((res) => res.data);
}
