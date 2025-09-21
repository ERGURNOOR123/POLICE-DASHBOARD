import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Statistics = () => {
  const { 
    statistics, 
    dangerousAreas, 
    loading, 
    error, 
    updateStatistics, 
    createDangerousArea, 
    updateDangerousArea, 
    deleteDangerousArea 
  } = useData();
  
  const [showStatsForm, setShowStatsForm] = useState(false);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [statsFormData, setStatsFormData] = useState(statistics);
  const [areaFormData, setAreaFormData] = useState({
    name: '',
    risk: 'Low',
    users: 0
  });

  const handleStatsSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStatistics(statsFormData);
      setShowStatsForm(false);
    } catch (err) {
      console.error('Error updating statistics:', err);
    }
  };

  const handleAreaSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDangerousArea(areaFormData);
      setAreaFormData({ name: '', risk: 'Low', users: 0 });
      setShowAreaForm(false);
    } catch (err) {
      console.error('Error creating dangerous area:', err);
    }
  };

  const handleAreaDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dangerous area?')) {
      try {
        await deleteDangerousArea(id);
      } catch (err) {
        console.error('Error deleting dangerous area:', err);
      }
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-400 bg-red-900';
      case 'Medium': return 'text-yellow-400 bg-yellow-900';
      case 'Low': return 'text-green-400 bg-green-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Statistics & Analytics</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowStatsForm(!showStatsForm)}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-dark transition-colors"
          >
            {showStatsForm ? 'Cancel' : 'Edit Statistics'}
          </button>
          <button
            onClick={() => setShowAreaForm(!showAreaForm)}
            className="px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green-dark transition-colors"
          >
            {showAreaForm ? 'Cancel' : 'Add Area'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-600 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Edit Statistics Form */}
      {showStatsForm && (
        <div className="mb-6 bg-dark-card border border-dark-border rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Edit Statistics</h2>
          <form onSubmit={handleStatsSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Total Users</label>
              <input
                type="number"
                value={statsFormData.totalUsers}
                onChange={(e) => setStatsFormData({...statsFormData, totalUsers: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Personal Vehicle Users</label>
              <input
                type="number"
                value={statsFormData.personalVehicleUsers}
                onChange={(e) => setStatsFormData({...statsFormData, personalVehicleUsers: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Active Foreigners</label>
              <input
                type="number"
                value={statsFormData.activeForeigners}
                onChange={(e) => setStatsFormData({...statsFormData, activeForeigners: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">E-FIR Count</label>
              <input
                type="number"
                value={statsFormData.eFirCount}
                onChange={(e) => setStatsFormData({...statsFormData, eFirCount: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Dangerous Area Users</label>
              <input
                type="number"
                value={statsFormData.dangerousAreaUsers}
                onChange={(e) => setStatsFormData({...statsFormData, dangerousAreaUsers: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Active Trip Users</label>
              <input
                type="number"
                value={statsFormData.activeTripUsers}
                onChange={(e) => setStatsFormData({...statsFormData, activeTripUsers: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="px-6 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green-dark transition-colors"
              >
                Update Statistics
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Dangerous Area Form */}
      {showAreaForm && (
        <div className="mb-6 bg-dark-card border border-dark-border rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Add Dangerous Area</h2>
          <form onSubmit={handleAreaSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Area Name</label>
              <input
                type="text"
                value={areaFormData.name}
                onChange={(e) => setAreaFormData({...areaFormData, name: e.target.value})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                placeholder="e.g., Downtown Mumbai"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Risk Level</label>
              <select
                value={areaFormData.risk}
                onChange={(e) => setAreaFormData({...areaFormData, risk: e.target.value})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">User Count</label>
              <input
                type="number"
                value={areaFormData.users}
                onChange={(e) => setAreaFormData({...areaFormData, users: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white"
                min="0"
                required
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="px-6 py-2 bg-accent-green text-white rounded-lg hover:bg-accent-green-dark transition-colors"
              >
                Add Dangerous Area
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-blue rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.totalUsers}</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Total Users Registered</h3>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-green rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.personalVehicleUsers}</div>
              <div className="text-xs text-gray-400">Personal</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Personal Vehicle Users</h3>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-yellow rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.activeForeigners}</div>
              <div className="text-xs text-gray-400">International</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Active Foreigner Users</h3>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-red rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.eFirCount}</div>
              <div className="text-xs text-gray-400">Reports</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">E-FIR Count</h3>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-red rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.dangerousAreaUsers}</div>
              <div className="text-xs text-gray-400">High Risk</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Users in Dangerous Areas</h3>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent-blue rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{statistics.activeTripUsers}</div>
              <div className="text-xs text-gray-400">Traveling</div>
            </div>
          </div>
          <h3 className="text-sm text-gray-400 font-medium">Active Users on Trip</h3>
        </div>
      </div>

      {/* Dangerous Areas */}
      <div className="bg-dark-card border border-dark-border rounded-lg">
        <div className="p-4 border-b border-dark-border">
          <h2 className="text-xl font-semibold text-white">
            Dangerous Areas Alert ({dangerousAreas.length})
            {loading && <span className="ml-2 text-xs text-gray-400">Loading...</span>}
          </h2>
        </div>
        
        <div className="p-4">
          {dangerousAreas.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No dangerous areas found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dangerousAreas.map((area, index) => (
                <div key={index} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-medium">{area.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(area.risk)}`}>
                      {area.risk}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {area.users} user{area.users !== 1 ? 's' : ''} in area
                  </p>
                  <button
                    onClick={() => handleAreaDelete(area.id || index)}
                    className="w-full px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
