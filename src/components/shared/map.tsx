'use client';

import React, { useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Loading from "@/components/shared/loading";

interface UserMapData {
  lat: number;
  lng: number;
}

interface Props {
  lat: number;
  lng: number;
  height: string;
  zoom?: number;
  showInfoWindow?: boolean;
  children?: React.ReactNode;
  formatted_address?: string;
  mapAddressFiled?: any; // Consider replacing `any` with a specific type
  mapCurrentPosition?: (address: string) => void; // Type the callback function
}

// Rename the component to avoid conflict with global `Map`
const GoogleMapComponent: React.FC<Props> = ({
                                               lat,
                                               lng,
                                               height,
                                               zoom,
                                               showInfoWindow,
                                               mapCurrentPosition,
                                             }) => {
  const containerStyle = {
    width: '100%',
    height: height || '420px',
  };
  
  const center = {
    lat: lat || 1.295831,
    lng: lng || 103.76261,
  };
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  });
  
  const [selectedMarker, setSelectedMarker] = useState<any>(null); // Consider typing this properly
  const [mapPosition, setMapPosition] = useState<UserMapData | null>(null);
  const [infoWindowToggle, setInfoWindowToggle] = useState<boolean>(false);
  
  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.domEvent.type === 'click') {
      setInfoWindowToggle(true);
    }
    const geocoder = new google.maps.Geocoder();
    const latLng = {
      lat: e.latLng?.lat() ?? 0,
      lng: e.latLng?.lng() ?? 0,
    };
    geocoder
    .geocode({ location: latLng })
    .then((response: google.maps.GeocoderResponse) => {
      if (response.results[0]) {
        if (mapCurrentPosition) {
          mapCurrentPosition(response.results[0]?.formatted_address);
        }
        setSelectedMarker(response.results[0]);
        setMapPosition(latLng);
        setInfoWindowToggle(true);
      } else {
        window.alert('No results found');
      }
    })
    .catch((e: Error) => window.alert('Geocoder failed due to: ' + e.message));
  };
  
  return isLoaded ? (
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapPosition || center}
          zoom={zoom || 15}
      >
        <Marker
            position={mapPosition || center}
            draggable={true}
            visible={true}
            icon={'/assets/images/pin.png'}
            onDragEnd={onMarkerDragEnd}
            onClick={onMarkerDragEnd}
        >
          {showInfoWindow && infoWindowToggle && (
              <InfoWindow
                  position={mapPosition || center}
                  onCloseClick={() => setInfoWindowToggle(false)}
              >
                <p>{selectedMarker?.formatted_address}</p>
              </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
  ) : (
      <Loading/>
  );
};

export default React.memo(GoogleMapComponent);