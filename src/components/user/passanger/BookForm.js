import React from "react";
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
    for (let index = 0; index < userContext.singleRide.seats; index++) {
      arr.push(index + 1);
    }
    return arr;
  };
  return (
    <>
      <FormControl className="form-input-custom">
        <InputLabel id="select-label">Select seats</InputLabel>
        <Select
          name="seats"
          labelId="select-label"
          id="select"
          value={""}
          onChange={userContext.handleChangePost("seats")}
        >
          {getSeats().map(item => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <button className="waves-effect waves-light btn layout-btn">book</button>
    </>
  );
};

export default BookForm;
