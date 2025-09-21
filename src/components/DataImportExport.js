import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';

const DataImportExport = () => {
  const { importExcelFile, error } = useData();
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const result = await importExcelFile(file);
      setImportResult({
        success: true,
        message: 'Excel file imported successfully!',
        data: result.data
      });
    } catch (err) {
      setImportResult({
        success: false,
        message: err.message || 'Excel import is not available in frontend-only mode'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const downloadTemplate = () => {
    // Create a simple CSV template that users can convert to Excel
    const templateData = {
      sosCalls: [
        ['Time', 'Location', 'Type', 'Status', 'Phone', 'EmergencyPhone'],
        ['14:32', 'Taj Mahal, Agra', 'Medical Emergency', 'active', '+91 98765 43210', '+91 100'],
        ['14:28', 'Red Fort, Delhi', 'Theft Report', 'active', '+91 98765 43211', '+91 100']
      ],
      userMarkers: [
        ['Name', 'Latitude', 'Longitude', 'Type', 'Nationality', 'Vehicle', 'Status', 'LastSeen'],
        ['John Smith', 28.6139, 77.2090, 'tourist', 'USA', 'Personal', 'safe', '2 min ago'],
        ['Maria Garcia', 19.0760, 72.8777, 'tourist', 'Spain', 'Public Transport', 'warning', '5 min ago']
      ],
      statistics: [
        ['TotalUsers', 'PersonalVehicleUsers', 'ActiveForeigners', 'EFIRCount', 'DangerousAreaUsers', 'ActiveTripUsers'],
        [1247, 892, 156, 23, 8, 445]
      ],
      dangerousAreas: [
        ['Name', 'RiskLevel', 'UserCount'],
        ['Downtown Mumbai', 'High', 3],
        ['Old Delhi', 'Medium', 2]
      ]
    };

    // Create and download CSV files for each sheet
    Object.entries(templateData).forEach(([sheetName, data]) => {
      const csvContent = data.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sheetName}_template.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Data Import/Export
      </h3>
      
      <div className="p-3 mb-4 bg-yellow-900 border border-yellow-600 rounded-lg">
        <p className="text-sm text-yellow-200">
          ⚠️ Excel import is not available in frontend-only mode. This is a demo version.
        </p>
      </div>

      <div className="space-y-4">
        {/* Excel Import */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-white">Import Excel Data</h4>
          <div className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isImporting}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="px-4 py-2 text-white transition-colors rounded-lg bg-accent-blue hover:bg-accent-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isImporting ? 'Importing...' : 'Select Excel File (Demo)'}
            </button>
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 text-white transition-colors rounded-lg bg-accent-green hover:bg-accent-green-dark"
            >
              Download Template
            </button>
          </div>
          
          {importResult && (
            <div className={`mt-2 p-3 rounded-lg ${
              importResult.success 
                ? 'bg-green-900 border border-green-600' 
                : 'bg-red-900 border border-red-600'
            }`}>
              <p className={`text-sm ${
                importResult.success ? 'text-green-200' : 'text-red-200'
              }`}>
                {importResult.message}
              </p>
              {importResult.data && (
                <div className="mt-2 text-xs text-gray-300">
                  <p>Import Summary:</p>
                  <ul className="ml-2 list-disc list-inside">
                    {Object.entries(importResult.data).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value.imported} imported, {value.errors} errors
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        
      </div>
    </div>
  );
};

export default DataImportExport;
