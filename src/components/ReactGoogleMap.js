import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useGetLatLongitudeQuery } from "../services/Post";

const containerStyle = {
  width: "100%",
  height: "400px",
  marginBottom: "50px",
};

function ReactGoogleMap() {
  const { data: userLocationQuery } = useGetLatLongitudeQuery();
  const [location, setLocation] = useState([]);
  console.log(location);

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: 24.914426666666667,
    lng: 86.63796166666667,
  });
  const [zoom, setZoom] = useState(2);
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    const reversedList = userLocationQuery?.results?.allData;
    setLocation(reversedList);
  }, [userLocationQuery]);

  useEffect(() => {
    if (userLocationQuery) {
      getCordinates();
    }
  }, [userLocationQuery]);

  const getCordinates = () => {
    const locationcoordinate = userLocationQuery?.results?.allData;

    const newRows = [];
    if (locationcoordinate) {
      (locationcoordinate || [])?.map((item, index) => {
        const returnData = {};

        returnData.lat = +item?.latitude;
        returnData.lng = +item?.longitude;

        if (returnData.lat && returnData.lng) {
          newRows.push(returnData);
        }
      });
    }

    setMarkers(newRows);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDcanuAHLnXyDw1QtBH2aMdAPb_cRGweWA",
  });

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach((marker) => {
        bounds.extend(marker);
      });

      if (markers.length === 0) {
        setCenter({
          lat: 24.914426666666667,
          lng: 86.63796166666667,
        });
        setZoom(12);
      } else {
        setCenter({
          lat: bounds.getCenter().lat(),
          lng: bounds.getCenter().lng(),
        });
        setZoom(map.getZoom());
      }

      setMap(map);
    },
    [markers, setZoom]
  );

  const onUnmount = () => {};

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      // zoom={8}
      zoom={zoom}
      onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      <>
        {(markers || [])?.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </>
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

export default React.memo(ReactGoogleMap);
