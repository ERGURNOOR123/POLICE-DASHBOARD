import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapSection from '../components/MapSection';
import StatsCards from '../components/StatsCards';

const Dashboard = () => {
  const [selectedCall, setSelectedCall] = useState(null);

  const handleCallSelect = (call) => {
    setSelectedCall(call);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <Sidebar 
        selectedCall={selectedCall} 
        onCallSelect={handleCallSelect} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Map Section */}
        <div className="flex-1">
          <MapSection selectedCall={selectedCall} />
        </div>
        
        {/* Stats Cards Section */}
        <div className="h-80">
          <StatsCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
