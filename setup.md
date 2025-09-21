# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Maps JavaScript API"
4. Create an API Key
5. Create `.env` file in root directory:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

## 3. Run the Dashboard
```bash
npm start
```

The dashboard will open at `http://localhost:3000`

## Features Included:
✅ Dark theme professional design
✅ Real-time date/time display
✅ Interactive India map with Google Maps
✅ SOS alerts sidebar with call details
✅ Live statistics cards with animated counters
✅ Tourist location markers on map
✅ Responsive design
✅ Dummy data for demonstration

## Next Steps:
- Replace dummy data with your backend API
- Add real-time WebSocket connections
- Implement user authentication
- Add more detailed reporting features
