import React, { useState } from "react";
import UserContext from "./userContext";
// imoprt third party
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import helpers
import { uploadLicense } from "../../components/user/userApi";
import { isAuthenticated } from "../../components/auth";

const UserState = props => {
  const [photo, setPhoto] = useState({
    photo: "",
    error: "",
    success: "",
    loading: false,
    formData: new FormData()
  });

  const [googleSearch, setGoogleSearch] = useState({
    addressFrom: "",
    addressFromLatLng: {},
    addressTo: "",
    addressToLatLng: {}
  });

  // handle change funcs

  const handleChangePhoto = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    photo.formData.set(name, value);

    setPhoto({ ...photo, [name]: value, error: "" });
  };
  // google maps
  const handleChangeAddressFrom = address => {
    setGoogleSearch({ ...googleSearch, addressFrom: address });
  };

  const handleChangeAddressTo = address => {
    setGoogleSearch({ ...googleSearch, addressTo: address });
  };

  const handleSelectAddressFrom = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setGoogleSearch({
          ...googleSearch,
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
        setGoogleSearch({
          ...googleSearch,
          addressTo: address,
          addressToLatLng: latLng
        });
      })
      .catch(error => console.error("Error", error));
  };

  // end of handle change

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

  return (
    <UserContext.Provider
      value={{
        //photo
        photo,
        handleChangePhoto,
        clickSubmitPhoto,
        // google maps
        googleSearch,
        handleChangeAddressFrom,
        handleSelectAddressFrom,
        handleChangeAddressTo,
        handleSelectAddressTo
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
