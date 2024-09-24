//@ts-nocheck
"use client"
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline,Popup,Tooltip } from 'react-leaflet';
import L from 'leaflet';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import polyline from 'polyline';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// Custom marker icon with corrected path





function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}


const Map = ({ geo, encodedPolyline }) => {

const [currentgeo, setcurrentgeo] = useState([34.12397, 74.83936])
getCurrentCoordinates()
  .then((coords) => {

    setcurrentgeo([coords.latitude,coords.longitude])
   
  })

  console.log(geo);
  console.log(encodedPolyline);

  if (encodedPolyline) {
    const decodedPoints = polyline.decode(encodedPolyline).map(coord => [coord[0], coord[1]]);

    return (
      <div className="p-3">
        <MapContainer scrollWheelZoom={true} center={geo || [34.12397, 74.83936]} zoom={9} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


<Marker  position={currentgeo|| [34.12397, 74.83936]}>
<Tooltip permanent> You are here </Tooltip> {/* Permanent displays label always */}
  
</Marker>

          <Marker position={geo || [34.12397, 74.83936]} >

       

          </Marker>
          {encodedPolyline && decodedPoints && <Polyline pathOptions={{ color: 'blue' }} positions={decodedPoints} />}
        </MapContainer>
      </div>
    );
  } else {
    return (
      <div className="p-3">
        <MapContainer center={geo} zoom={13} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={geo}  />
        </MapContainer>
      </div>
    );
  }
};

export default Map;