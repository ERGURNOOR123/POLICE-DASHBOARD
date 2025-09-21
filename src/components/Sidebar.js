import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { callDetails } from '../data/dummyData';

const Sidebar = ({ selectedCall, onCallSelect }) => {
  const { sosCalls, loading, error } = useData();
  const [selectedSosCall, setSelectedSosCall] = useState(selectedCall || null);

  const handleCallClick = (call) => {
    setSelectedSosCall(call);
    onCallSelect(call);
  };

  // Set first call as selected when data loads
  useEffect(() => {
    if (sosCalls.length > 0 && !selectedSosCall) {
      setSelectedSosCall(sosCalls[0]);
      onCallSelect(sosCalls[0]);
    }
  }, [sosCalls, selectedSosCall, onCallSelect]);

  return (
    <div className="w-80 bg-dark-card border-r border-dark-border h-full overflow-y-auto">
      {/* Connection Status */}
      {error && (
        <div className="p-2 bg-yellow-900 border-b border-yellow-600">
          <p className="text-yellow-200 text-xs text-center">
            Frontend-Only Mode
          </p>
        </div>
      )}
      
      {/* Active SOS Calls Section */}
      <div className="p-4 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-3 h-3 bg-accent-red rounded-full mr-2 sos-pulse"></span>
          Active Calls for SOS
          {loading && <span className="ml-2 text-xs text-gray-400">Loading...</span>}
        </h2>
        <div className="space-y-3">
          {sosCalls.length === 0 && !loading ? (
            <p className="text-gray-400 text-sm text-center py-4">No active SOS calls</p>
          ) : (
            sosCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => handleCallClick(call)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedSosCall && selectedSosCall.id === call.id
                    ? 'border-accent-blue bg-accent-blue bg-opacity-10 glow-effect'
                    : 'border-dark-border hover:border-accent-blue hover:bg-accent-blue hover:bg-opacity-5'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-accent-blue font-semibold text-sm">
                    {call.time}
                  </span>
                  <span className="text-xs bg-accent-red text-white px-2 py-1 rounded-full">
                    {call.type}
                  </span>
                </div>
                <p className="text-white text-sm font-medium mb-1">
                  {call.location}
                </p>
                <p className="text-gray-400 text-xs">
                  Phone: {call.phone}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Call Details Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          Call Details
        </h3>
        <div className="space-y-4">
          <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
            <label className="text-gray-400 text-xs uppercase tracking-wide">
              Address (Location)
            </label>
            <p className="text-white text-sm mt-1">
              {selectedSosCall ? selectedSosCall.location : callDetails.address}
            </p>
          </div>

          <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
            <label className="text-gray-400 text-xs uppercase tracking-wide">
              IP Address
            </label>
            <p className="text-accent-blue text-sm mt-1 font-mono">
              {callDetails.ipAddress}
            </p>
          </div>

          <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
            <label className="text-gray-400 text-xs uppercase tracking-wide">
              Phone No.
            </label>
            <p className="text-white text-sm mt-1">
              {selectedSosCall ? selectedSosCall.phone : callDetails.phone}
            </p>
          </div>

          <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
            <label className="text-gray-400 text-xs uppercase tracking-wide">
              Emergency Phone No.
            </label>
            <p className="text-accent-red text-sm mt-1 font-semibold">
              {selectedSosCall ? selectedSosCall.emergencyPhone : callDetails.emergencyPhone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
