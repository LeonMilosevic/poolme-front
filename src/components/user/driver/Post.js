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
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Post = () => {
  const userContext = React.useContext(UserContext);
  return (
    <>
      <FormControl className="form-input-custom">
        <InputLabel id="select-label">Passangers</InputLabel>
        <Select
          name="seats"
          labelId="select-label"
          id="select"
          value={userContext.driverPost.seats}
          onChange={userContext.handleChangePost("seats")}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
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
      <FormControlLabel
        control={
          <Checkbox
            checked={userContext.driverPost.petsAllowed}
            onChange={userContext.handleChangeChecked("petsAllowed")}
            value={userContext.driverPost.petsAllowed}
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={userContext.driverPost.smokingAllowed}
            onChange={userContext.handleChangeChecked("smokingAllowed")}
            value={userContext.driverPost.smokingAllowed}
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={userContext.driverPost.twoPeopleInTheBack}
            onChange={userContext.handleChangeChecked("twoPeopleInTheBack")}
            value={userContext.driverPost.twoPeopleInTheBack}
            color="primary"
          />
        }
        label="Primary"
      />
      <TextField
        inputProps={{ maxLength: 250 }}
        id="driverText"
        className="form-input-custom"
        label="Add something"
        multiline
        placeholder="Are you stopping somewhere? Do you have any rules?"
        rowsMax="5"
        name="extraText"
        value={userContext.driverPost.extraText}
        color="primary"
        onChange={userContext.handleChangePost("extraText")}
        variant="outlined"
      />
      <button
        onClick={userContext.clickSubmitPost}
        className="user-btn-sign btn btn-success waves-effect waves-light"
        type="submit"
      >
        Submit
      </button>
    </>
  );
};

export default Post;
