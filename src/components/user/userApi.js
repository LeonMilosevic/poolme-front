import { API } from "../../config";

export const uploadLicense = (userId, token, photo) => {
  return fetch(`${API}/user/driver/license/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: photo
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createPost = (token, post) => {
  return fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
