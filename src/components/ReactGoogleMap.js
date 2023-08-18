import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useGetLatLongitudeQuery } from "../services/Post";

const containerStyle = {
  width: "100%",
  height: "400px",
  marginBottom: "50px",
};

function ReactGoogleMap() {
  const userLocationQuery = useGetLatLongitudeQuery();
  const [location, setLocation] = useState([]);
  console.log(location);

  useEffect(() => {
    const reversedList =
      userLocationQuery?.data?.results?.allData?.slice().reverse() ?? [];
    setLocation(reversedList);
  }, [userLocationQuery]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDcanuAHLnXyDw1QtBH2aMdAPb_cRGweWA",
  });

  const center = {
    lat: location.length > 0 ? parseFloat(location[0]?.latitude) : 37.7749,
    lng: location.length > 0 ? parseFloat(location[0]?.longitude) : -122.4194,
  };

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    location.forEach((loc, index) => {
      const latitude = parseFloat(loc.latitude);
      const longitude = parseFloat(loc.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        bounds.extend({ lat: latitude, lng: longitude });
      } else {
        console.warn(
          "Invalid latitude or longitude for location at index",
          index,
          loc
        );
      }
    });
    map.fitBounds(bounds);
  };

  const onUnmount = () => {
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {location.map((loc, index) => {
        const latitude = parseFloat(loc?.latitude);
        const longitude = parseFloat(loc?.longitude);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          console.log(
            "Marker latitude:",
            latitude,
            "Marker longitude:",
            longitude
          );
          return (
            <Marker key={index} position={{ lat: latitude, lng: longitude }} />
          );
        } else {
          console.warn(
            "Invalid latitude or longitude for location at index",
            index,
            loc
          );
          return null;
        }
      })}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

export default React.memo(ReactGoogleMap);
