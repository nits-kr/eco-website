import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {
  const [markers, setMarkers] = useState([
    ['0', 'Total User 7', 34.593839, -98.409974, 'Total User 7'],
    ['1', 'Total User 10', 34.613839, -98.409974, 'Total User 10'],
    ['2', 'Total User 20', 34.607799, -98.396419, 'Total User 20'],
    ['3', 'Total User 2', 34.623425, -98.468883, 'Total User 2'],
    ['4', 'Total User 9', 34.593839, -98.409974, 'Total User 9'],
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapStyles = {
    height: '100%',
    width: '100%',
  };
  const defaultCenter = {
    lat: 34.593839,
    lng: -98.409974,
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
      {markers.map((marker) => (
        <Marker
          key={marker[0]}
          position={{ lat: marker[2], lng: marker[3] }}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker[2], lng: selectedMarker[3] }}
          onCloseClick={() => handleInfoWindowClose()}
        >
          <div>{selectedMarker[1]}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapContainer;
