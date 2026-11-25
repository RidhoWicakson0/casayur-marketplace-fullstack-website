import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix ikon Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });

function LocationMarker({ position, onChange }) {
    useMapEvents({
        click(e) { onChange(e.latlng.lat, e.latlng.lng); },
    });
    return position ? <Marker position={position} /> : null;
}

export function MapPicker({ lat, lng, onChange }) {
    const position = lat && lng ? [parseFloat(lat), parseFloat(lng)] : [-6.9141, 109.3789];
    return (
        <div className="h-[300px] w-full rounded-lg overflow-hidden border border-line">
            <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={position} onChange={onChange} />
            </MapContainer>
        </div>
    );
}
