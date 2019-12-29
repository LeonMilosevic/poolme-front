import { REACT_APP_GOOGLE_PLACES_API } from "../../config";
export const loadGoogleMaps = callback => {
  const existingScript = document.getElementById("googleMaps");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_PLACES_API}&libraries=places`;
    script.id = "googleMaps";
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export const loadSocketIoClient = callback => {
  const existingScript = document.getElementById("socketIo-client");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js`;
    script.id = "socketIo-client";
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
