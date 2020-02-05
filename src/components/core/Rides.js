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

  let upcomingR = [];

  const displayRides = () => {
    userContext.displayPostsByPrice.posts.map(post => {
      if (new Date().getTime() < new Date(post.timeOfDeparture).getTime())
        upcomingR.push(post);

      return upcomingR;
    });
  };

  return (
    <div className="row home-info center">
      <div className="home-header">Explore some rides</div>
      {displayRides()}
      {upcomingR.length > 0 ? (
        upcomingR.map((item, i) => <RidesCard post={item} key={i} />)
      ) : (
        <div>No available rides</div>
      )}
    </div>
  );
};

export default Rides;
