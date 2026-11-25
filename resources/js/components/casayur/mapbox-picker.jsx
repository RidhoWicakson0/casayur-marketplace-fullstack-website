import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

export function MapboxPicker({ lat, lng, onChange }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng || 109.3789, lat || -6.9141],
            zoom: 15
        });

        marker.current = new mapboxgl.Marker({ draggable: true, color: '#2D6A4F' }) // Warna leaf
            .setLngLat([lng || 109.3789, lat || -6.9141])
            .addTo(map.current);

        marker.current.on('dragend', () => {
            const { lng, lat } = marker.current.getLngLat();
            onChange(lat, lng);
        });
    }, [lat, lng]);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-line shadow-sm transition-all hover:shadow-md">
            <div ref={mapContainer} className="h-[250px] w-full" />
        </div>
    );
}
