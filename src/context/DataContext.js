import React, { createContext, useContext, useState, useEffect } from 'react';
import { sosCalls, userMarkers, statistics, dangerousAreas } from '../data/dummyData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [sosCallsData, setSosCallsData] = useState([...sosCalls]);
  const [userMarkersData, setUserMarkersData] = useState([...userMarkers]);
  const [statisticsData, setStatisticsData] = useState({...statistics});
  const [dangerousAreasData, setDangerousAreasData] = useState([...dangerousAreas]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refresh data (just reload dummy data)
  const refreshData = () => {
    setSosCallsData([...sosCalls]);
    setUserMarkersData([...userMarkers]);
    setStatisticsData({...statistics});
    setDangerousAreasData([...dangerousAreas]);
  };

  // SOS Calls methods
  const createSosCall = async (callData) => {
    const newCall = { id: Date.now(), ...callData };
    setSosCallsData(prev => [newCall, ...prev]);
    return newCall;
  };

  const updateSosCallStatus = async (id, status) => {
    setSosCallsData(prev => prev.map(call => 
      call.id === id ? { ...call, status } : call
    ));
  };

  const deleteSosCall = async (id) => {
    setSosCallsData(prev => prev.filter(call => call.id !== id));
  };

  // User Markers methods
  const createUserMarker = async (markerData) => {
    const newMarker = { id: Date.now(), ...markerData };
    setUserMarkersData(prev => [newMarker, ...prev]);
    return newMarker;
  };

  const updateUserMarker = async (id, markerData) => {
    setUserMarkersData(prev => prev.map(marker => 
      marker.id === id ? { ...marker, ...markerData } : marker
    ));
  };

  const deleteUserMarker = async (id) => {
    setUserMarkersData(prev => prev.filter(marker => marker.id !== id));
  };

  // Statistics methods
  const updateStatistics = async (statsData) => {
    setStatisticsData(prev => ({ ...prev, ...statsData }));
  };

  // Dangerous Areas methods
  const createDangerousArea = async (areaData) => {
    const newArea = { id: Date.now(), ...areaData };
    setDangerousAreasData(prev => [newArea, ...prev]);
    return newArea;
  };

  const updateDangerousArea = async (id, areaData) => {
    setDangerousAreasData(prev => prev.map(area => 
      area.id === id ? { ...area, ...areaData } : area
    ));
  };

  const deleteDangerousArea = async (id) => {
    setDangerousAreasData(prev => prev.filter(area => area.id !== id));
  };

  // Excel import (simplified for frontend-only)
  const importExcelFile = async (file) => {
    setError('Excel import is not available in frontend-only mode');
    throw new Error('Excel import is not available in frontend-only mode');
  };

  const value = {
    // Data
    sosCalls: sosCallsData,
    userMarkers: userMarkersData,
    statistics: statisticsData,
    dangerousAreas: dangerousAreasData,
    loading,
    error,
    
    // Methods
    refreshData,
    createSosCall,
    updateSosCallStatus,
    deleteSosCall,
    createUserMarker,
    updateUserMarker,
    deleteUserMarker,
    updateStatistics,
    createDangerousArea,
    updateDangerousArea,
    deleteDangerousArea,
    importExcelFile
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
