import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const SOSCalls = () => {
  const { sosCalls, loading, error, createSosCall, updateSosCallStatus, deleteSosCall } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    time: '',
    location: '',
    type: '',
    phone: '',
    emergency_phone: '+91 100'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSosCall(formData);
      setFormData({
        time: '',
        location: '',
        type: '',
        phone: '',
        emergency_phone: '+91 100'
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating SOS call:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSosCallStatus(id, newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this SOS call?')) {
      try {
        await deleteSosCall(id);
      } catch (err) {
        console.error('Error deleting SOS call:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">SOS Calls Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-white transition-colors bg-blue-900 rounded-lg hover:bg-accent-blue-dark"
        >
          {showForm ? 'Cancel' : 'Add New Call'}
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-900 border border-red-600 rounded-lg">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* Add New Call Form */}
      {showForm && (
        <div className="p-4 mb-6 border rounded-lg bg-dark-card border-dark-border">
          <h2 className="mb-4 text-xl font-semibold text-white">Add New SOS Call</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm text-gray-400">Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., 14:32"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., Taj Mahal, Agra"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                required
              >
                <option value="">Select Type</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Theft Report">Theft Report</option>
                <option value="Lost Tourist">Lost Tourist</option>
                <option value="Accident">Accident</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., +91 98765 43210"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm text-gray-400">Emergency Phone</label>
              <input
                type="text"
                value={formData.emergency_phone}
                onChange={(e) => setFormData({...formData, emergency_phone: e.target.value})}
                className="w-full px-3 py-2 text-white border rounded-lg bg-dark-bg border-dark-border"
                placeholder="e.g., +91 100"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 text-white transition-colors rounded-lg bg-accent-green hover:bg-accent-green-dark"
              >
                Create SOS Call
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SOS Calls List */}
      <div className="border rounded-lg bg-dark-card border-dark-border">
        <div className="p-4 border-b border-dark-border">
          <h2 className="text-xl font-semibold text-white">
            Active SOS Calls ({sosCalls.length})
            {loading && <span className="ml-2 text-xs text-gray-400">Loading...</span>}
          </h2>
        </div>
        
        <div className="p-4">
          {sosCalls.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No SOS calls found</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sosCalls.map((call) => (
                <div key={call.id} className="p-4 border rounded-lg bg-dark-bg border-dark-border">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-semibold text-accent-blue">
                      {call.time}
                    </span>
                    <span className="px-2 py-1 text-xs text-white rounded-full bg-accent-red">
                      {call.type}
                    </span>
                  </div>
                  
                  <h3 className="mb-2 font-medium text-white">{call.location}</h3>
                  <p className="mb-2 text-sm text-gray-400">Phone: {call.phone}</p>
                  <p className="mb-3 text-sm text-gray-400">Emergency: {call.emergency_phone}</p>
                  
                  <div className="flex items-center justify-between">
                    <select
                      value={call.status}
                      onChange={(e) => handleStatusChange(call.id, e.target.value)}
                      className="px-2 py-1 text-xs text-white border rounded bg-dark-bg border-dark-border"
                    >
                      <option value="active">Active</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <button
                      onClick={() => handleDelete(call.id)}
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

export default SOSCalls;
