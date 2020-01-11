import React, { useState } from "react";
import UserContext from "./userContext";
// imoprt third party
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import helpers
import {
  uploadLicense,
  createPost,
  getPosts,
  bookRide
} from "../../components/user/userApi";
import { isAuthenticated } from "../../components/auth";

const UserState = props => {
  const [photo, setPhoto] = useState({
    photo: "",
    error: "",
    success: "",
    loading: false,
    formData: new FormData()
  });

  const [driverPost, setDriverPost] = useState({
    addressFrom: "",
    addressFromLatLng: {},
    addressTo: "",
    addressToLatLng: {},
    stoppingBy: "",
    stoppingByLatLng: {},
    distance: Number,
    timeOfDeparture: new Date("2020-01-18T21:11:54"),
    pricePerPassanger: "",
    seats: "",
    petsAllowed: false,
    smokingAllowed: false,
    twoPeopleInTheBack: false,
    extraText: "",
    loading: false,
    error: "",
    success: ""
  });

  const [displayPostsByPrice, setDisplayPostsByPrice] = useState({
    posts: [],
    error: "",
    loading: false
  });

  const [allPosts, setAllPosts] = useState([]);

  const [singlePost, setSinglePost] = useState({});

  const [bookSingleRide, setBookSingleRide] = useState({
    seats: "",
    loading: false,
    error: "",
    success: ""
  });

  const [user, setUser] = useState({
    user: {},
    loaded: false,
    rank: "",
    totalDistance: ""
  });
  // get posts
  const getPostsByPrice = () => {
    setDisplayPostsByPrice({ ...displayPostsByPrice, loading: true });
    getPosts("pricePerPassanger", 3)
      .then(data => {
        if (data.error)
          return setDisplayPostsByPrice({
            ...displayPostsByPrice,
            loading: false,
            error: data.error
          });

        setDisplayPostsByPrice({
          ...displayPostsByPrice,
          loading: false,
          posts: data,
          error: ""
        });
      })
      .catch(error => console.log(error));
  };
  // populate posts
  const getAllPosts = () => {
    getPosts("createdAt", undefined)
      .then(data => {
        if (data.error) return console.log(data.error);

        setAllPosts(data);
      })
      .catch(error => console.log(error));
  };
  // handle change funcs
  const handleChangePhoto = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    photo.formData.set(name, value);

    setPhoto({ ...photo, [name]: value, error: "" });
  };
  // date change
  const handleChangeDate = date => {
    setDriverPost({ ...driverPost, timeOfDeparture: date, success: "" });
  };
  // post change
  const handleChangePost = name => e => {
    setDriverPost({ ...driverPost, [name]: e.target.value, success: "" });
  };
  // checked change
  const handleChangeChecked = name => e => {
    setDriverPost({ ...driverPost, [name]: e.target.checked, success: "" });
  };
  // google maps
  const handleChangeAddressFrom = address => {
    setDriverPost({ ...driverPost, addressFrom: address, success: "" });
  };

  const handleChangeAddressTo = address => {
    setDriverPost({ ...driverPost, addressTo: address });
  };

  const handleChangeSeatsBooking = e => {
    setBookSingleRide({ ...bookSingleRide, seats: e.target.value });
  };

  const handleSelectAddressFrom = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setDriverPost({
          ...driverPost,
          addressFrom: address,
          addressFromLatLng: latLng,
          success: ""
        });
      })
      .catch(error => console.error("Error", error));
  };

  const handleSelectAddressTo = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setDriverPost({
          ...driverPost,
          addressTo: address,
          addressToLatLng: latLng,
          success: ""
        });
      })
      .catch(error => console.error("Error", error));
  };

  const handleChangeStoppingBy = address => {
    setDriverPost({ ...driverPost, stoppingBy: address, success: "" });
  };

  const handleSelectStoppingBy = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setDriverPost({
          ...driverPost,
          stoppingBy: address,
          stoppingByLatLng: latLng,
          success: ""
        });
      })
      .catch(error => console.error("Error", error));
  };

  // end of handle change
  // submit funcs
  const clickSubmitPhoto = e => {
    e.preventDefault();
    setPhoto({ ...photo, loading: true });
    if (!photo.photo)
      return setPhoto({
        ...photo,
        loading: false,
        error: "Please include a photo"
      });

    uploadLicense(
      isAuthenticated().user._id,
      isAuthenticated().token,
      photo.formData
    ).then(data => {
      if (data.error)
        return setPhoto({ ...photo, error: data.error, loading: false });

      setPhoto({
        ...photo,
        loading: false,
        success: "Uploaded successfully, we will update your profile soon"
      });
    });
  };

  const clickSubmitPost = e => {
    e.preventDefault();

    setDriverPost({ ...driverPost, loading: true, error: "" });

    if (
      driverPost.addressFrom === "" ||
      driverPost.addressTo === "" ||
      driverPost.pricePerPassanger === "" ||
      driverPost.seats === "" ||
      driverPost.extraText === "" ||
      driverPost.timeOfDeparture === ""
    ) {
      return setDriverPost({
        ...driverPost,
        loading: false,
        error: "all fields are required"
      });
    }

    // calculate distance
    const rad = function(x) {
      return (x * Math.PI) / 180;
    };

    const getDistance = function(p1, p2) {
      const R = 6378137; // Earth’s mean radius in meter
      const dLat = rad(p2.lat - p1.lat);
      const dLong = rad(p2.lng - p1.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) *
          Math.cos(rad(p2.lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d; // returns the distance in meter
    };
    const distancem = getDistance(
      driverPost.addressFromLatLng,
      driverPost.addressToLatLng
    ).toFixed(2);
    const distancekm = distancem / 1000;

    const post = {
      addressFrom: driverPost.addressFrom,
      addressFromLatLng: driverPost.addressFromLatLng,
      addressTo: driverPost.addressTo,
      addressToLatLng: driverPost.addressToLatLng,
      stoppingBy: driverPost.stoppingBy,
      stoppingByLatLng: driverPost.stoppingByLatLng,
      timeOfDeparture: driverPost.timeOfDeparture,
      pricePerPassanger: driverPost.pricePerPassanger,
      petsAllowed: driverPost.petsAllowed,
      smokingAllowed: driverPost.smokingAllowed,
      twoPeopleInTheBack: driverPost.twoPeopleInTheBack,
      seats: driverPost.seats,
      extraText: driverPost.extraText,
      distance: distancekm
    };

    createPost(isAuthenticated().token, isAuthenticated().user._id, post)
      .then(data => {
        if (data.error)
          return setDriverPost({
            ...driverPost,
            loading: false,
            error: data.error
          });

        setDriverPost({
          ...driverPost,
          loading: false,
          success: "Post created successfuly",
          error: "",
          addressFrom: "",
          addressFromLatLng: {},
          addressTo: "",
          addressToLatLng: {},
          stoppingBy: "",
          stoppingByLatLng: {},
          smokingAllowed: false,
          petsAllowed: false,
          twoPeopleInTheBack: false,
          distance: undefined,
          timeOfDeparture: new Date("2020-01-18T21:11:54"),
          pricePerPassanger: "",
          seats: "",
          extraText: ""
        });
      })
      .catch(error => console.log(error));
  };

  const submitBooking = e => {
    e.preventDefault();
    setBookSingleRide({ ...bookSingleRide, loading: true });
    // create ride
    const ride = {
      postId: singlePost._id,
      userId: isAuthenticated().user._id,
      seats: bookSingleRide.seats
    };
    bookRide(isAuthenticated().token, ride)
      .then(data => {
        if (data.error)
          return setBookSingleRide({
            ...setBookSingleRide,
            loading: false,
            error: data.error
          });

        setBookSingleRide({
          ...bookSingleRide,
          loading: false,
          success: "booked successfuly"
        });
      })
      .catch(error => console.log(error));
  };

  // calculating rank based on distance traveled function
  const calRank = () => {
    let rank;
    let historyDistance = [];

    if (user.loaded) {
      user.user.history.map(post => {
        historyDistance.push(Math.round(Number(post.distance) * 1e2) / 1e2);
      });
    }

    const totalDistance = historyDistance.reduce((a, b) => a + b, 0);

    if (totalDistance < 500) {
      rank = "the beginner";
    } else if (totalDistance < 1000) {
      rank = "the explorer";
    } else {
      rank = "the wise";
    }

    return setUser({
      ...user,
      rank,
      totalDistance: totalDistance.toFixed(2)
    });
  };

  return (
    <UserContext.Provider
      value={{
        //photo
        photo,
        handleChangePhoto,
        clickSubmitPhoto,
        // google maps
        handleChangeAddressFrom,
        handleSelectAddressFrom,
        handleChangeAddressTo,
        handleSelectAddressTo,
        handleChangeStoppingBy,
        handleSelectStoppingBy,
        // date
        driverPost,
        handleChangeDate,
        //post
        allPosts,
        getAllPosts,
        displayPostsByPrice,
        getPostsByPrice,
        handleChangePost,
        handleChangeChecked,
        clickSubmitPost,
        //single ride
        singlePost,
        setSinglePost,
        //book single
        bookSingleRide,
        setBookSingleRide,
        handleChangeSeatsBooking,
        submitBooking,
        //user
        user,
        setUser,
        calRank
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
