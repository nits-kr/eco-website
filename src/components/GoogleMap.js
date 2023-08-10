import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function GoogleMap({ google, latitude, longitude }) {
  const mapStyles = {
    width: "100%",
    height: "400px",
  };
  return (
    <>
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </>
  );
}

// export default GoogleMap;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDcanuAHLnXyDw1QtBH2aMdAPb_cRGweWA",
})(GoogleMap);
