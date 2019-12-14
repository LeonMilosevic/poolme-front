import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import material
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import EuroIcon from "@material-ui/icons/Euro";

const Post = () => {
  const userContext = React.useContext(UserContext);
  return (
    <>
      <FormControl className="form-input-custom">
        <InputLabel id="select-label">Seats</InputLabel>
        <Select
          name="seats"
          labelId="select-label"
          id="select"
          value={userContext.driverPost.seats}
          onChange={userContext.handleChangePost("seats")}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form-input-custom">
        <InputLabel htmlFor="price">Price per passenger</InputLabel>
        <Input
          name="pricePerPassanger"
          onChange={userContext.handleChangePost("pricePerPassanger")}
          type="number"
          id="price"
          endAdornment={
            <InputAdornment position="end">
              <EuroIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default Post;