import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-accent-blue">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue-dark transition-colors font-medium"
          >
            🏠 Go to Dashboard
          </Link>
          
          <div className="text-gray-400 text-sm">
            <p>Available pages:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/sos-calls" className="text-accent-blue hover:text-white transition-colors">
                SOS Calls
              </Link>
              <Link to="/user-markers" className="text-accent-blue hover:text-white transition-colors">
                User Markers
              </Link>
              <Link to="/statistics" className="text-accent-blue hover:text-white transition-colors">
                Statistics
              </Link>
              <Link to="/data-management" className="text-accent-blue hover:text-white transition-colors">
                Data Management
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
