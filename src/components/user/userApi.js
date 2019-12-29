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

export const createPost = (token, user, post) => {
  return fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post, user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPosts = (sortBy, limit) => {
  return fetch(`${API}/posts?sortBy=${sortBy}&order=asc&limit=${limit}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const read = postById => {
  return fetch(`${API}/posts/${postById}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const createRide = (token, userId, ride) => {
  return fetch(`${API}/ride/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ride)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getRides = (userId, token) => {
  return fetch(`${API}/ride/list/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getSingleRideChat = (userId, token, rideId) => {
  return fetch(`${API}/ride/read/${userId}/${rideId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
