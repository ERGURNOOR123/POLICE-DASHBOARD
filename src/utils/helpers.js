// Utility functions for the dashboard

export const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'safe':
      return 'text-accent-green';
    case 'warning':
      return 'text-accent-yellow';
    case 'danger':
      return 'text-accent-red';
    default:
      return 'text-gray-400';
  }
};

export const getStatusBgColor = (status) => {
  switch (status) {
    case 'safe':
      return 'bg-accent-green';
    case 'warning':
      return 'bg-accent-yellow';
    case 'danger':
      return 'bg-accent-red';
    default:
      return 'bg-gray-400';
  }
};

export const getRiskColor = (risk) => {
  switch (risk) {
    case 'High':
      return 'text-accent-red';
    case 'Medium':
      return 'text-accent-yellow';
    case 'Low':
      return 'text-accent-green';
    default:
      return 'text-gray-400';
  }
};

export const animateCounter = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
