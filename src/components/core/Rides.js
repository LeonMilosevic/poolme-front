import React from "react";
// import context
import UserContext from "../../context/user/userContext";
// import comp
import RidesCard from "./RidesCard";
const Rides = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    userContext.getPostsByPrice();
  }, []);

  return (
    <div className="row">
      {userContext.displayPostsByPrice.posts.map((post, i) => (
        <RidesCard key={i} post={post} />
      ))}
    </div>
  );
};

export default Rides;
