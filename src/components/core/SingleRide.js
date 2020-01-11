import React from "react";
// import helpers
import { getSinglePost } from "../user/userApi";
import { handleError, handleSuccess } from "../ui";
// import context
import UserContext from "../../context/user/userContext";
import BookForm from "../user/passanger/BookForm";

const SingleRide = props => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const id = props.match.params.rideId;
    getSinglePost(id).then(data => {
      if (data.error)
        return userContext.setSinglePost({
          ...userContext.singlePost,
          error: data.error
        });
      return userContext.setSinglePost(data);
    });
  }, []);

  return (
    <>
      {handleError(userContext.bookSingleRide.error)}
      {handleSuccess(userContext.bookSingleRide.success)}
      {userContext.singlePost && userContext.singlePost.user && (
        <div>
          <div>from: {userContext.singlePost.addressFrom}</div>
          <div>to: {userContext.singlePost.addressTo}</div>
          <div>
            {userContext.singlePost.stoppingBy
              ? `stopping by: ${userContext.singlePost.stoppingBy}`
              : ""}
          </div>
          <div>when: {userContext.singlePost.timeOfDeparture}</div>
          <div>price: {userContext.singlePost.pricePerPassanger}</div>
          <div>distance: {userContext.singlePost.distance}</div>
          <div>
            seats left:{" "}
            {userContext.singlePost.seats === 0 ? (
              <span>
                none <button>notify me if seats open</button>
              </span>
            ) : (
              userContext.singlePost.seats
            )}
          </div>
          <div>words from driver: {userContext.singlePost.extraText}</div>
          <div>
            driver: {userContext.singlePost.user.firstName}{" "}
            {userContext.singlePost.user.lastName}
          </div>
          <div>
            verified: {userContext.singlePost.user.verified ? "yes" : "no"}
          </div>
          <div>Pets allowed?: {userContext.singlePost.petsAllowed}</div>
          <div>smoking allowed?: {userContext.singlePost.smokingAllowed}</div>
          <div>
            twoPeopleInTheBack?: {userContext.singlePost.twoPeopleInTheBack}
          </div>
          <BookForm />
        </div>
      )}
    </>
  );
};

export default SingleRide;
