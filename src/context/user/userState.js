import React, { useState } from "react";
import UserContext from "./userContext";
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

  const handleChangePhoto = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    photo.formData.set(name, value);

    setPhoto({ ...photo, [name]: value, error: "" });
  };

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
        photo,
        handleChangePhoto,
        clickSubmitPhoto
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
