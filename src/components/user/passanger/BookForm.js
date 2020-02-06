import React from "react";
// import helpers
import { isAuthenticated } from "../../auth";
// import context
import UserContext from "../../../context/user/userContext";
// import material
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const BookForm = () => {
  const userContext = React.useContext(UserContext);

  const getSeats = () => {
    let arr = [];
    for (let index = 0; index < userContext.singlePost.seats; index++) {
      arr.push(index + 1);
    }
    return arr;
  };
  return (
    <>
      <FormControl className="form-input-custom">
        <InputLabel id="select-label">Select seats</InputLabel>
        <Select
          labelId="select-label"
          value={userContext.bookSingleRide.seats}
          onChange={userContext.handleChangeSeatsBooking}
        >
          {getSeats().map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isAuthenticated() ? (
        <div className="center" style={{ margin: "40px 0" }}>
          <button
            onClick={userContext.submitBooking}
            className="waves-effect waves-light btn layout-btn"
          >
            book
          </button>
        </div>
      ) : (
        <div className="center" style={{ margin: "40px 0" }}>
          <button className="waves-effect waves-light btn layout-btn disabled">
            please sign in to book
          </button>
        </div>
      )}
    </>
  );
};

export default BookForm;
