import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/helpers';
import DataImportExport from './DataImportExport';

const Header = () => {
  const [showImportExport, setShowImportExport] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'SOS Calls', path: '/sos-calls', icon: '🚨' },
    { name: 'User Markers', path: '/user-markers', icon: '👥' },
    { name: 'Statistics', path: '/statistics', icon: '📊' },
    { name: 'Data Management', path: '/data-management', icon: '💾' }
  ];

  return (
    <header className="px-6 py-4 border-b border-dark-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://i.pinimg.com/1200x/24/40/7f/24407fdc296f88fd3887a2260db20b57.jpg" 
            alt="Police Logo" 
            className="object-cover w-12 h-12 mr-3 rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">
              Real-Time Tourist Crime Report Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Police Department Monitoring System
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-gray-400 md:hidden hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden space-x-2 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          <button
            onClick={() => setShowImportExport(!showImportExport)}
            className="px-4 py-2 text-sm text-white transition-colors bg-blue-900 rounded hover:bg-accent-blue-dark"
          >
            {showImportExport ? 'Hide' : 'Import/Export'}
          </button>
          
          <div className="text-right">
            <div className="text-lg font-semibold ">
              {formatTime()}
            </div>
            <div className="text-sm text-gray-400">
              {formatDate()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="pt-4 mt-4 border-t md:hidden border-dark-border">
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileMenu(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {showImportExport && (
        <div className="mt-4">
          <DataImportExport />
        </div>
      )}
    </header>
  );
};

export default Header;
