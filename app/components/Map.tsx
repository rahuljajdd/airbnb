//@ts-nocheck
"use client"
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline,Popup,Tooltip, Circle ,useMap} from 'react-leaflet';
import L from 'leaflet';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import polyline from 'polyline';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// Custom marker icon with corrected path
import { useEffect } from 'react';

const calculateZoom = (radius, mapWidth, mapHeight) => {
  const radiusInMeters = radius * 1000; // Convert km to meters
  const earthCircumference = 40075017; // Circumference of the Earth in meters
  const zoomLevel = Math.log2(earthCircumference / (512 * radiusInMeters));
  
  // Ensure the zoom level is within the limits
  return Math.max(0, Math.min(zoomLevel, 20)); // Assuming zoom levels between 0 and 20
};
const radius = 10; // Example radius in kilometers
const mapWidth = 600; // Example width of the map in pixels
const mapHeight = 800; // Example height of the map in pixels
const geo = [51.505, -0.09]; // Example coordinates






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



const MapAdjuster = ({ geo, radius }) => {
  const map = useMap();

  useEffect(() => {
    if (radius) {
      // Calculate the bounds based on the circle's radius
      const bounds = [
        [geo[0] - radius / 111320, geo[1] - radius / (111320 * Math.cos((geo[0] * Math.PI) / 180))],
        [geo[0] + radius / 111320, geo[1] + radius / (111320 * Math.cos((geo[0] * Math.PI) / 180))],
      ];
      // Fit the map to the bounds
      map.fitBounds(bounds);
    } else {
      // If no radius, reset to the original center and zoom
      map.setView(geo, 13);
    }
  }, [geo, radius, map]);

  return null; // This component doesn't render anything
};



const Map = ({ geo, encodedPolyline,radius }) => {











const [currentgeo, setcurrentgeo] = useState([34.12397, 74.83936])
getCurrentCoordinates()
  .then((coords) => {

    setcurrentgeo([coords.latitude,coords.longitude])
   
  })

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
        <MapContainer touchZoom={false}
 center={geo} zoom={13} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={geo}  />
          {radius&& <Circle center={geo|| [34.12397, 74.83936]} radius={ radius*10000}></Circle>}
          {geo&&<MapAdjuster geo={geo||[34.12397, 74.83936]} radius={radius*10000} />}
        </MapContainer>
      </div>
    );
  }
};

export default Map;