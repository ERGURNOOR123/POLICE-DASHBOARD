import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const UserMarkers = () => {
  const { userMarkers, loading, error, createUserMarker, updateUserMarker, deleteUserMarker } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    type: 'tourist',
    nationality: '',
    vehicle: '',
    status: 'safe',
    lastSeen: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const markerData = {
        ...formData,
        position: {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude)
        }
      };
      await createUserMarker(markerData);
      setFormData({
        name: '',
        latitude: '',
        longitude: '',
        type: 'tourist',
        nationality: '',
        vehicle: '',
        status: 'safe',
        lastSeen: ''
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating user marker:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateUserMarker(id, { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user marker?')) {
      try {
        await deleteUserMarker(id);
      } catch (err) {
        console.error('Error deleting user marker:', err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-green-400 bg-green-900';
      case 'warning': return 'text-yellow-400 bg-yellow-900';
      case 'danger': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">User Markers Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-white transition-colors rounded-lg bg-accent-blue hover:bg-accent-blue-dark"
        >
          {showForm ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-900 border border-red-600 rounded-lg">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* Add New User Form */}
      {showForm && (
        <div className="p-4 mb-6 border rounded-lg border-dark-border">
          <h2 className="mb-4 text-xl font-semibold text-white">Add New User Marker</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm text-gray-400">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., John Smith"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Nationality</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., USA"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., 28.6139"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., 77.2090"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
              >
                <option value="tourist">Tourist</option>
                <option value="local">Local</option>
                <option value="official">Official</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Vehicle</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
              >
                <option value="">Select Vehicle</option>
                <option value="Personal">Personal</option>
                <option value="Public Transport">Public Transport</option>
                <option value="Taxi">Taxi</option>
                <option value="Rental">Rental</option>
                <option value="Walking">Walking</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
              >
                <option value="safe">Safe</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Last Seen</label>
              <input
                type="text"
                value={formData.lastSeen}
                onChange={(e) => setFormData({...formData, lastSeen: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., 2 min ago"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 text-white transition-colors rounded-lg bg-accent-green hover:bg-accent-green-dark"
              >
                Create User Marker
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Markers List */}
      <div className="border rounded-lg bg-dark-card border-dark-border">
        <div className="p-4 border-b border-dark-border">
          <h2 className="text-xl font-semibold text-white">
            User Markers ({userMarkers.length})
            {loading && <span className="ml-2 text-xs text-gray-400">Loading...</span>}
          </h2>
        </div>
        
        <div className="p-4">
          {userMarkers.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No user markers found</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userMarkers.map((user) => (
                <div key={user.id} className="p-4 border rounded-lg bg-dark-bg border-dark-border">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-white">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-white">Nationality:</span> {user.nationality}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white">Type:</span> {user.type}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white">Vehicle:</span> {user.vehicle}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white">Location:</span> {user.position.lat.toFixed(4)}, {user.position.lng.toFixed(4)}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white">Last Seen:</span> {user.lastSeen}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="px-2 py-1 text-xs text-white border rounded bg-dark-bg border-dark-border"
                    >
                      <option value="safe">Safe</option>
                      <option value="warning">Warning</option>
                      <option value="danger">Danger</option>
                    </select>
                    
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 text-xs text-white transition-colors bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMarkers;
