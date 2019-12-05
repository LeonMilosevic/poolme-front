import { API } from "../../config.js";
import jwt from "jsonwebtoken";

export const signup = user => {
  console.log(user);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
