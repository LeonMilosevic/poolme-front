import React from "react";
// import context
import UserContext from "../../context/user/userContext";
// import comp
import RidesCard from "./RidesCard";
// import material
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// import icons
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

const SearchRide = () => {
  const userContext = React.useContext(UserContext);
  // states
  const [filteredData, setFilteredData] = React.useState([]);
  const [filteredFromData, setFilteredFromData] = React.useState([]);
  const [data, setData] = React.useState({
    from: "",
    to: ""
  });
  // effects
  React.useEffect(() => {
    userContext.getAllPosts();
  }, []);

  React.useEffect(() => {
    sortedFromData();
  }, [data.from]);

  React.useEffect(() => {
    sortedData();
  }, [data.to]);
  // sorting funcs
  const sortedFromData = () => {
    let tempData = userContext.availablePosts;

    let tempFromData = tempData.filter(item => item.addressFrom === data.from);

    tempData = tempFromData;

    setFilteredFromData(tempData);
  };

  const sortedData = () => {
    if (filteredFromData) {
      let tempData = filteredFromData;

      let tempToData = tempData.filter(item => item.addressTo === data.to);

      tempData = tempToData;

      setFilteredData(tempData);
    }
  };
  // handleChange func
  const handleChangeData = name => event => {
    setData({ ...data, [name]: event.target.value });
  };

  return (
    <div className="fullheight-wrapper container">
      <div style={{ margin: "20px" }} className="dash-header center">
        Search for a ride
      </div>
      <div
        className="singleRide-icon-div"
        style={{ justifyContent: "center", marginLeft: "-20px" }}
      >
        <PriorityHighIcon style={{ color: "#FFCC00", fontSize: "36px" }} />
        <h6>Only available rides will be shown</h6>
      </div>
      <FormControl className="search-formcontrol">
        <InputLabel id="select-label">From</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={data.from}
          onChange={handleChangeData("from")}
        >
          {userContext.availablePosts &&
            userContext.availablePosts.map((post, i) => (
              <MenuItem key={i} value={post.addressFrom}>
                {post.addressFrom}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {filteredFromData.length > 0 && (
        <FormControl className="search-formcontrol">
          <InputLabel id="select-label">To</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={data.to}
            onChange={handleChangeData("to")}
          >
            {filteredFromData.length > 0 &&
              filteredFromData.map((post, i) => (
                <MenuItem key={i} value={post.addressTo}>
                  {post.addressTo}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
      {filteredData.length > 0 &&
        filteredData.map((post, i) => <RidesCard key={i} post={post} />)}
    </div>
  );
};

export default SearchRide;
