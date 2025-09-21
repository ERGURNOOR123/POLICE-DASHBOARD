import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { animateCounter } from '../utils/helpers';

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    if (counterRef.current) {
      animateCounter(counterRef.current, 0, value, 2000);
    }
  }, [value]);

  return (
    <div className="p-4 border rounded-lg border-dark-border card-hover">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <div ref={counterRef} className="text-2xl font-bold text-white">
            0
          </div>
          {subtitle && (
            <div className="text-xs text-gray-400">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-400">
        {title}
      </h3>
    </div>
  );
};

const StatsCards = () => {
  const { statistics, dangerousAreas, loading, error } = useData();
  
  const stats = [
    {
      title: "Total Users Registered",
      value: statistics.totalUsers,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>,
      color: "bg-accent-blue",
      subtitle: "Active"
    },
    {
      title: "Users Traveling by Personal Vehicle",
      value: statistics.personalVehicleUsers,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>,
      color: "bg-accent-green",
      subtitle: "Personal"
    },
    {
      title: "Active Foreigner Users",
      value: statistics.activeForeigners,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>,
      color: "bg-accent-yellow",
      subtitle: "International"
    },
    {
      title: "E-FIR Count",
      value: statistics.eFirCount,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>,
      color: "bg-accent-red",
      subtitle: "Reports"
    },
    {
      title: "Users in Dangerous Areas",
      value: statistics.dangerousAreaUsers,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>,
      color: "bg-accent-red",
      subtitle: "High Risk"
    },
    {
      title: "Active Users on Trip",
      value: statistics.activeTripUsers,
      icon: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>,
      color: "bg-accent-blue",
      subtitle: "Traveling"
    }
  ];

  return (
    <div className="p-4 bg-dark-bg">
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold text-white">
          Live Statistics
          {loading && <span className="ml-2 text-xs text-gray-400">Loading...</span>}
        </h2>
        <p className="text-sm text-gray-400">
          Real-time monitoring data and analytics
          {error && <span className="ml-2 text-yellow-400">(Frontend-Only Mode)</span>}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Dangerous Areas Section */}
      <div className="p-4 border rounded-lg border-dark-border">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Dangerous Areas Alert
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dangerousAreas.map((area, index) => (
            <div key={index} className="p-3 border rounded-lg bg-dark-bg border-dark-border">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-white">
                  {area.name}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  area.risk === 'High' ? 'bg-accent-red text-white' :
                  area.risk === 'Medium' ? 'bg-accent-yellow text-black' :
                  'bg-accent-green text-white'
                }`}>
                  {area.risk}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {area.users} user{area.users !== 1 ? 's' : ''} in area
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
