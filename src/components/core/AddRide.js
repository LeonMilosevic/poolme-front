import React, { useContext } from "react";
// import context
import UserContext from "../../context/user/userContext";
// import helpers
import { isAuthenticated } from "../auth";
import { handleError, handleSuccess } from "../ui";
import { loadGoogleMaps } from "./helpers";
// import components
import GoogleSearch from "../user/driver/GoogleSearch";
import DatePicker from "../user/driver/DatePicker";
import Post from "../user/driver/Post";
// imoprt ui
import Button from "@material-ui/core/Button";
import Spinner from "../ui/Spinner";

const AddRide = () => {
  const [googleMapsReady, setGoogleMaps] = React.useState(false);

  React.useEffect(() => {
    loadGoogleMaps(() => {
      setGoogleMaps(true);
    });
  }, []);
  const userContext = useContext(UserContext);

  const isVerified = () => (
    <>
      {userContext.driverPost.loading ? (
        <Spinner />
      ) : (
        <div className="container">
          {handleError(userContext.driverPost.error)}
          {handleSuccess(userContext.driverPost.success)}
          {googleMapsReady ? <GoogleSearch /> : ""}
          <DatePicker />
          <Post />
        </div>
      )}
    </>
  );

  const uploadForm = () => (
    <div className="container">
      <h6>To post a ride your account must be verified</h6>
      <div className="drivers-form">
        <h6>Attach your Drivers Licencse</h6>
        <input
          name="photo"
          onChange={userContext.handleChangePhoto("photo")}
          accept="image/*"
          id="text-button-file"
          multiple
          type="file"
        />
        <label htmlFor="text-button-file" className="custom-file-upload">
          Please choose a file
        </label>
        <Button onClick={userContext.clickSubmitPhoto} className="btn-custom">
          Upload
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {handleError(userContext.photo.error)}
      {handleSuccess(userContext.photo.success)}
      {userContext.photo.loading ? (
        <Spinner />
      ) : isAuthenticated().user.driver.verified ? (
        isVerified()
      ) : (
        uploadForm()
      )}
    </>
  );
};

export default AddRide;
