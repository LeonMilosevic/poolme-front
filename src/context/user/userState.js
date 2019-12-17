import React, { useState } from "react";
import UserContext from "./userContext";
// imoprt third party
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import helpers
import { uploadLicense, createPost } from "../../components/user/userApi";
import { isAuthenticated } from "../../components/auth";

const UserState = props => {
  const [photo, setPhoto] = useState({
    photo: "",
    error: "",
    success: "",
    loading: false,
    formData: new FormData()
  });

  const [driverPost, setDriverPost] = useState({
    addressFrom: "",
    addressFromLatLng: {},
    addressTo: "",
    addressToLatLng: {},
    timeOfDeparture: new Date("2020-01-18T21:11:54"),
    pricePerPassanger: "",
    seats: "",
    extraText: "",
    loading: false,
    error: "",
    success: ""
  });

  // handle change funcs

  const handleChangePhoto = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    photo.formData.set(name, value);

    setPhoto({ ...photo, [name]: value, error: "" });
  };
  // date change
  const handleChangeDate = date => {
    setDriverPost({ ...driverPost, timeOfDeparture: date });
  };
  // post change
  const handleChangePost = name => e => {
    setDriverPost({ ...driverPost, [name]: e.target.value });
  };
  // google maps
  const handleChangeAddressFrom = address => {
    setDriverPost({ ...driverPost, addressFrom: address });
  };

  const handleChangeAddressTo = address => {
    setDriverPost({ ...driverPost, addressTo: address });
  };

  const handleSelectAddressFrom = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setDriverPost({
          ...driverPost,
          addressFrom: address,
          addressFromLatLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  const handleSelectAddressTo = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setDriverPost({
          ...driverPost,
          addressTo: address,
          addressToLatLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  // end of handle change
  // submit funcs
  const clickSubmitPhoto = e => {
    e.preventDefault();
    setPhoto({ ...photo, loading: true });
    if (!photo.photo)
      return setPhoto({
        ...photo,
        loading: false,
        error: "Please include a photo"
      });

    uploadLicense(
      isAuthenticated().user._id,
      isAuthenticated().token,
      photo.formData
    ).then(data => {
      if (data.error)
        return setPhoto({ ...photo, error: data.error, loading: false });

      setPhoto({
        ...photo,
        loading: false,
        success: "Uploaded successfully, we will update your profile soon"
      });
    });
  };

  const clickSubmitPost = e => {
    e.preventDefault();

    setDriverPost({ ...driverPost, loading: true, error: "" });

    if (
      driverPost.addressFrom === "" ||
      driverPost.addressTo === "" ||
      driverPost.pricePerPassanger === "" ||
      driverPost.seats === "" ||
      driverPost.extraText === "" ||
      driverPost.timeOfDeparture === ""
    ) {
      return setDriverPost({
        ...driverPost,
        loading: false,
        error: "all fields are required"
      });
    }

    const post = {
      addressFrom: driverPost.addressFrom,
      addressFromLatLng: driverPost.addressFromLatLng,
      addressTo: driverPost.addressTo,
      addressToLatLng: driverPost.addressToLatLng,
      timeOfDeparture: driverPost.timeOfDeparture,
      pricePerPassanger: driverPost.pricePerPassanger,
      seats: driverPost.seats,
      extraText: driverPost.extraText
    };

    createPost(isAuthenticated().token, post)
      .then(data => {
        if (data.error)
          return setDriverPost({
            ...driverPost,
            loading: false,
            error: data.error
          });

        setDriverPost({
          ...driverPost,
          loading: false,
          success: "Post created successfuly",
          error: "",
          addressFrom: "",
          addressFromLatLng: {},
          addressTo: "",
          addressToLatLng: {},
          timeOfDeparture: new Date("2020-01-18T21:11:54"),
          pricePerPassanger: "",
          seats: "",
          extraText: ""
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <UserContext.Provider
      value={{
        //photo
        photo,
        handleChangePhoto,
        clickSubmitPhoto,
        // google maps
        handleChangeAddressFrom,
        handleSelectAddressFrom,
        handleChangeAddressTo,
        handleSelectAddressTo,
        // date
        driverPost,
        handleChangeDate,
        //post
        handleChangePost,
        clickSubmitPost
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
