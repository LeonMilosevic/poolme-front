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
    <div className="row home-info center">
      <div className="home-header">Explore some rides</div>
      {userContext.displayPostsByPrice.posts.map((post, i) => (
        <RidesCard key={i} post={post} />
      ))}
    </div>
  );
};

export default Rides;
