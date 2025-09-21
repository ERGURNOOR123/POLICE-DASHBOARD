// Dummy data for the dashboard
export const sosCalls = [
  {
    id: 1,
    time: "14:32",
    location: "Taj Mahal, Agra",
    type: "Medical Emergency",
    status: "active",
    phone: "+91 98765 43210",
    emergencyPhone: "+91 100"
  },
  {
    id: 2,
    time: "14:28",
    location: "Red Fort, Delhi",
    type: "Theft Report",
    status: "active",
    phone: "+91 98765 43211",
    emergencyPhone: "+91 100"
  },
  {
    id: 3,
    time: "14:25",
    location: "Gateway of India, Mumbai",
    type: "Lost Tourist",
    status: "active",
    phone: "+91 98765 43212",
    emergencyPhone: "+91 100"
  },
  {
    id: 4,
    time: "14:20",
    location: "Golden Temple, Amritsar",
    type: "Accident",
    status: "active",
    phone: "+91 98765 43213",
    emergencyPhone: "+91 100"
  },
  {
    id: 5,
    time: "14:15",
    location: "Hawa Mahal, Jaipur",
    type: "Harassment",
    status: "active",
    phone: "+91 98765 43214",
    emergencyPhone: "+91 100"
  }
];

export const callDetails = {
  address: "Taj Mahal, Agra, Uttar Pradesh 282001",
  ipAddress: "192.168.1.100",
  phone: "+91 98765 43210",
  emergencyPhone: "+91 100"
};

export const userMarkers = [
  {
    id: 1,
    name: "John Smith",
    position: { lat: 28.6139, lng: 77.2090 }, // Delhi
    type: "tourist",
    nationality: "USA",
    vehicle: "Personal",
    status: "safe",
    lastSeen: "2 min ago"
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    type: "tourist",
    nationality: "Spain",
    vehicle: "Public Transport",
    status: "warning",
    lastSeen: "5 min ago"
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    position: { lat: 27.1767, lng: 78.0081 }, // Agra
    type: "tourist",
    nationality: "Egypt",
    vehicle: "Personal",
    status: "danger",
    lastSeen: "1 min ago"
  },
  {
    id: 4,
    name: "Emma Johnson",
    position: { lat: 26.9124, lng: 75.7873 }, // Jaipur
    type: "tourist",
    nationality: "UK",
    vehicle: "Personal",
    status: "safe",
    lastSeen: "3 min ago"
  },
  {
    id: 5,
    name: "Chen Wei",
    position: { lat: 31.6340, lng: 74.8723 }, // Amritsar
    type: "tourist",
    nationality: "China",
    vehicle: "Public Transport",
    status: "safe",
    lastSeen: "4 min ago"
  },
  {
    id: 6,
    name: "Pierre Dubois",
    position: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    type: "tourist",
    nationality: "France",
    vehicle: "Personal",
    status: "warning",
    lastSeen: "6 min ago"
  }
];

export const statistics = {
  totalUsers: 1247,
  personalVehicleUsers: 892,
  activeForeigners: 156,
  eFirCount: 23,
  dangerousAreaUsers: 8,
  activeTripUsers: 445
};

export const dangerousAreas = [
  { name: "Downtown Mumbai", risk: "High", users: 3 },
  { name: "Old Delhi", risk: "Medium", users: 2 },
  { name: "Goa Beach Area", risk: "Medium", users: 2 },
  { name: "Kolkata Metro", risk: "Low", users: 1 }
];
