import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useData } from '../context/DataContext';
import { getStatusColor, getStatusBgColor } from '../utils/helpers';

const MapSection = ({ selectedCall }) => {
  const { userMarkers, loading, error } = useData();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { InfoWindow } = await loader.importLibrary('places');

        const mapInstance = new Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'landscape',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#2c3545' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#606d76' }]
            }
          ]
        });

        setMap(mapInstance);

        // Create markers for users
        const userMarkersList = userMarkers.map((user) => {
          const marker = new Marker({
            position: user.position,
            map: mapInstance,
            title: user.name,
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: getStatusColor(user.status).replace('text-', '#'),
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
              scale: 1.5
            }
          });

          const infoWindow = new InfoWindow({
            content: `
              <div class="p-3 text-black">
                <h3 class="font-bold text-lg">${user.name}</h3>
                <p class="text-sm text-gray-600">${user.nationality}</p>
                <p class="text-sm">Vehicle: ${user.vehicle}</p>
                <p class="text-sm">Status: <span class="font-semibold ${getStatusColor(user.status)}">${user.status.toUpperCase()}</span></p>
                <p class="text-xs text-gray-500">Last seen: ${user.lastSeen}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
            setSelectedUser(user);
          });

          return { marker, user, infoWindow };
        });

        setMarkers(userMarkersList);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
        // Fallback: Show a placeholder if API key is not available
        mapRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-dark-card text-white">
            <div class="text-center">
              <div class="text-4xl mb-4">🗺️</div>
              <h3 class="text-xl font-semibold mb-2">India Map</h3>
              <p class="text-gray-400">Google Maps integration</p>
              <p class="text-sm text-gray-500 mt-2">Add your Google Maps API key to enable live tracking</p>
            </div>
          </div>
        `;
      }
    };

    initMap();
  }, []);

  // Update map center when a call is selected
  useEffect(() => {
    if (map && selectedCall) {
      // Find user marker for the selected call location
      const user = userMarkers.find(u => 
        u.name.toLowerCase().includes(selectedCall.location.toLowerCase().split(',')[0]) ||
        selectedCall.location.toLowerCase().includes(u.name.toLowerCase())
      );
      
      if (user) {
        map.setCenter(user.position);
        map.setZoom(12);
        setSelectedUser(user);
      }
    }
  }, [map, selectedCall]);

  return (
    <div className="flex-1 bg-dark-bg p-4">
      <div className="h-full">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            Live Tourist Tracking
          </h2>
          <p className="text-gray-400 text-sm">
            Real-time monitoring of tourist locations across India
          </p>
        </div>
        
        <div className="map-container h-full">
          <div ref={mapRef} className="w-full h-full rounded-lg" />
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-green rounded-full mr-2"></div>
            <span className="text-gray-400">Safe</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-yellow rounded-full mr-2"></div>
            <span className="text-gray-400">Warning</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent-red rounded-full mr-2"></div>
            <span className="text-gray-400">Danger</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
