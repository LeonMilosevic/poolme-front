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
