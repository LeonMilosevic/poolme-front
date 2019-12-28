import React from "react";
// import helpers
import { read } from "../user/userApi";
import { handleError, handleSuccess } from "../ui";
// import context
import UserContext from "../../context/user/userContext";
import BookForm from "../user/passanger/BookForm";

const SingleRide = props => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const id = props.match.params.rideId;
    read(id).then(data => {
      if (data.error)
        return userContext.setSingleRide({
          ...userContext.singleRide,
          error: data.error
        });
      userContext.setSingleRide(data);
    });
  }, []);

  return (
    <>
      {handleError(userContext.bookSingleRide.error)}
      {handleSuccess(userContext.bookSingleRide.success)}
      {userContext.singleRide && userContext.singleRide.user && (
        <div>
          <div>from: {userContext.singleRide.addressFrom}</div>
          <div>to: {userContext.singleRide.addressTo}</div>
          <div>
            {userContext.singleRide.stoppingBy
              ? `stopping by: ${userContext.singleRide.stoppingBy}`
              : ""}
          </div>
          <div>when: {userContext.singleRide.timeOfDeparture}</div>
          <div>price: {userContext.singleRide.pricePerPassanger}</div>
          <div>
            seats left:{" "}
            {userContext.singleRide.seats === 0 ? (
              <span>
                none <button>notify me if seats open</button>
              </span>
            ) : (
              userContext.singleRide.seats
            )}
          </div>
          <div>words from driver: {userContext.singleRide.extraText}</div>
          <div>
            driver: {userContext.singleRide.user.firstName}{" "}
            {userContext.singleRide.user.lastName}
          </div>
          <div>
            verified:{" "}
            {userContext.singleRide.user.driver.verified ? "yes" : "no"}
          </div>
          <BookForm />
        </div>
      )}
    </>
  );
};

export default SingleRide;
