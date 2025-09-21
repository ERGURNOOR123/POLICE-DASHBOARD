import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SOSCalls from './pages/SOSCalls';
import UserMarkers from './pages/UserMarkers';
import Statistics from './pages/Statistics';
import DataManagement from './pages/DataManagement';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-dark-bg text-white">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sos-calls" element={<SOSCalls />} />
              <Route path="/user-markers" element={<UserMarkers />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/data-management" element={<DataManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
