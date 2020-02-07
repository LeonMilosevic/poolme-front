import React from "react";
// import helpers
import { getSinglePost } from "../user/userApi";
import { handleError, handleSuccess } from "../ui";
import Moment from "react-moment";
// import context
import UserContext from "../../context/user/userContext";
import BookForm from "../user/passanger/BookForm";
// import icons
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { ReactComponent as Pointer } from "../../imgs/pointer.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PetsIcon from "@material-ui/icons/Pets";
import BlockIcon from "@material-ui/icons/Block";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";

const SingleRide = props => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const id = props.match.params.rideId;
    getSinglePost(id).then(data => {
      console.log(data);
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
          <div style={{ margin: "20px 0" }} className="dash-header center">
            Ride information
          </div>
          <div className="singleRide-top">
            <div className="singleRide-date">
              <Moment interval={0} format="D MMM YYYY HH:mm">
                {userContext.singlePost.timeOfDeparture}
              </Moment>
            </div>
            <div className="singleRide-fromto">
              <div className="singleRide-fromto-div">
                <div>
                  <Pointer width={30} height={30} />
                </div>
                <div>From</div>
                <div>{userContext.singlePost.addressFrom}</div>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <ArrowRightAltIcon style={{ fontSize: "50px" }} />
              </div>
              <div className="singleRide-fromto-div">
                <div>
                  <Pointer width={30} height={30} />
                </div>
                <div>To</div>
                <div>{userContext.singlePost.addressTo}</div>
              </div>
            </div>
            <div className="singleRide-disc-wrapper">
              <div className="singleRide-disc">
                Price:{" "}
                <span className="singleRide-disc-span">
                  &euro;{userContext.singlePost.pricePerPassanger}
                </span>
              </div>
              <div className="singleRide-disc">
                Stopping by:{" "}
                {userContext.singlePost.stoppingBy ? (
                  <span className="singleRide-disc-span">
                    {userContext.singlePost.stoppingBy}
                  </span>
                ) : (
                  <span className="singleRide-disc-span">direct</span>
                )}
              </div>
              <div className="singleRide-disc">
                Seats left:{" "}
                {userContext.singlePost.seats === 0 ? (
                  <span>
                    none <button>notify me if seats open</button>
                  </span>
                ) : (
                  <span className="singleRide-disc-span">
                    {userContext.singlePost.seats}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="singleRide-driverinfo">
            <div className="singlRide-driverinfo-icons">
              <div>
                <AccountCircleIcon
                  style={{ fontSize: "48px", color: "#f0f8f8" }}
                />
                <div className="singleRide-name">
                  {userContext.singlePost.user.firstName}
                </div>
              </div>
              <div className="singleRide-icon-div">
                {userContext.singlePost.verified ? (
                  <>
                    <CheckCircleIcon
                      style={{
                        color: "#558b2f",
                        marginRight: "2px",
                        fontSize: "26px"
                      }}
                    />
                    <span>Id verified</span>
                  </>
                ) : (
                  <>
                    <HighlightOffIcon
                      style={{
                        color: "#bf4158",
                        fontSize: "26px",
                        marginRight: "2px"
                      }}
                    />
                    <span>Id not verified</span>
                  </>
                )}
              </div>
              <div className="singleRide-icon-div">
                <CheckCircleIcon
                  style={{
                    color: "#558b2f",
                    marginRight: "2px",
                    fontSize: "26px"
                  }}
                />
                <span>Email Verified</span>
              </div>
            </div>
            <div className="singleRide-comment">
              <div>Drivers comment:</div>
              <div style={{ textAlign: "center", color: "#f0f8f8" }}>
                {userContext.singlePost.extraText}
              </div>
            </div>
          </div>
          <div className="singleRide-extras">
            <div className="singleRide-icon-div">
              {userContext.singlePost.petsAllowed === "true" ? (
                <>
                  <PetsIcon
                    style={{
                      fontSize: "20px",
                      color: "#a3d9d2",
                      marginRight: "5px"
                    }}
                  />
                  Pets are allowed
                </>
              ) : (
                <>
                  <BlockIcon
                    style={{
                      fontSize: "20px",
                      color: "#bf4158",
                      marginRight: "5px"
                    }}
                  />
                  Pets are not allowed
                </>
              )}
            </div>
            <div className="singleRide-icon-div">
              {userContext.singlePost.smokingAllowed === "true" ? (
                <>
                  <SmokingRoomsIcon
                    style={{
                      fontSize: "20px",
                      color: "#a3d9d2",
                      marginRight: "5px"
                    }}
                  />
                  Smoking is allowed
                </>
              ) : (
                <>
                  <BlockIcon
                    style={{
                      fontSize: "20px",
                      color: "#bf4158",
                      marginRight: "5px"
                    }}
                  />
                  Smoking is not allowed
                </>
              )}
            </div>
            <div className="singleRide-icon-div">
              {userContext.singlePost.twoPeopleInTheBack === "true" ? (
                <>
                  <CheckCircleIcon
                    style={{
                      fontSize: "20px",
                      color: "#a3d9d2",
                      marginRight: "5px"
                    }}
                  />
                  Guarantees two people in the back
                </>
              ) : (
                <>
                  <BlockIcon
                    style={{
                      fontSize: "20px",
                      color: "#bf4158",
                      marginRight: "5px"
                    }}
                  />
                  Does not guarantee two people in the back
                </>
              )}
            </div>
          </div>

          <BookForm />
        </div>
      )}
    </>
  );
};

export default SingleRide;
