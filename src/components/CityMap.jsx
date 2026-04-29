import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_KEY = import.meta.env.VITE_API_KEY;


const locations = {
  "Los Angeles": [34.0522, -118.2437],
  "New York": [40.7128, -74.006],
  Dubai: [25.2048, 55.2708],
  London: [51.5072, -0.1276],
  Paris: [48.8566, 2.3522],
  Milan: [45.4642, 9.19],
  Tokyo: [35.6762, 139.6503],
  Beijing: [39.9042, 116.4074],
};

function ChangeMapView({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, 11);
  }, [coords, map]);

  return null;
}


export default function CityMap({ location, type ='precipitation_new' }) {
  const coords = locations[location] || locations["Los Angeles"];
  
  return (
    <MapContainer
      center={coords}
      zoom={11}
      className="h-full w-full z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        opacity={0.6}
        key={type}
        url={`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />

      <ChangeMapView coords={coords} />


      <Marker position={coords}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}