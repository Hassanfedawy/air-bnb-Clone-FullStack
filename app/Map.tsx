"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

import dynamic from "next/dynamic";
// Fix for marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: [number, number];
}

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, zoom); // Update the map view with new center and zoom
        }
    }, [center, zoom, map]);

    return null;
};

const MapComponent: React.FC<MapProps> = ({ center }) => {
    const defaultCenter: [number, number] = [51, -0.01];
    const zoomLevel = center ? 5 : 3; // Adjusted default zoom
    return (
        <MapContainer
            center={center || defaultCenter}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && <Marker position={center} />}
            {center && <MapUpdater center={center} zoom={zoomLevel} />}
        </MapContainer>
    );
};

export default MapComponent;
