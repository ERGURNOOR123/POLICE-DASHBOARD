import React from 'react';
import DataImportExport from '../components/DataImportExport';

const DataManagement = () => {
  return (
    <div className="p-6 border-dark-border">
      <div className="mb-6 border-dark-border">
        <h1 className="mb-2 text-3xl font-bold border-dark-bordertext-white">Data Management</h1>
        <p className="text-gray-400">
          Import and export data for your Police Dashboard. Manage Excel files and database connections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Impo  rt/Export Section */}
        <div>
          <DataImportExport />
        </div>

        {/* Frontend Information */}
        <div className="p-4 border rounded-lg border-dark-border">
          <h3 className="mb-4 text-lg font-semibold text-white">Frontend</h3>
          
            

            

            <div className="p-3 border rounded-lg bg-dark-bg border-dark-border">
              <h4 className="mb-2 font-medium text-white">Data Storage</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• <span className="text-blue-200">SOS Calls</span> - Emergency calls in memory</li>
                <li>• <span className="text-blue-200">User Markers</span> - User locations in memory</li>
                <li>• <span className="text-blue-200">Statistics</span> - Dashboard metrics in memory</li>
                <li>• <span className="text-blue-200">Dangerous Areas</span> - Risk areas in memory</li>
              </ul>
            </div>
          </div>
        
{/* bg-blue-900 */}
        
   

        {/* Quick Actions */}
        <div className="border rounded-lg flp-4 border-dark-border">
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Actions</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 text-sm text-white transition-colors rounded-lg bg-accent-blue hover:bg-accent-blue-dark"
            >
              🔄 Refresh Page (Reset Data)
            </button>
            <button 
              onClick={() => window.open('/', '_blank')}
              className="w-full px-4 py-2 text-sm text-white transition-colors rounded-lg bg-accent-green hover:bg-accent-green-dark"
            >
              🏠 Open Dashboard
            </button>
            <button 
              onClick={() => window.open('/sos-calls', '_blank')}
              className="w-full px-4 py-2 text-sm text-black transition-colors rounded-lg bg-accent-yellow hover:bg-accent-yellow-dark"
            >
              🚨 Manage SOS Calls
            </button>
            <button 
              onClick={() => window.open('/statistics', '_blank')}
              className="w-full px-4 py-2 text-sm text-white transition-colors rounded-lg bg-accent-red hover:bg-accent-red-dark"
            >
              📊 View Statistics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
