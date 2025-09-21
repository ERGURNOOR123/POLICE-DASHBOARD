# Tourist Safety Real-Time Monitoring Dashboard

A professional police monitoring dashboard for tracking tourist safety, SOS alerts, and live statistics across India.

## Features

- **Real-time Map Tracking**: Interactive India map with Google Maps integration showing tourist locations
- **SOS Alert System**: Live monitoring of emergency calls with detailed information
- **Statistics Dashboard**: Real-time counters for users, vehicles, foreigners, and incidents
- **Dark Theme Design**: Professional crime center dashboard styling
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Markers**: Click on map markers to view tourist details

## Tech Stack

- React 18
- TailwindCSS
- Google Maps JavaScript API
- Modern ES6+ JavaScript

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Google Maps API Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Maps JavaScript API
   - Create credentials (API Key)
   - Add your domain to API key restrictions

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Dashboard Components

### Header
- Dashboard title
- Current date and time display

### Left Sidebar
- **Active SOS Calls**: List of current emergency alerts
- **Call Details**: Address, IP, phone numbers for selected call

### Main Map Section
- Interactive India map with Google Maps
- Tourist location markers with status indicators
- Click markers to view user details
- Status legend (Safe/Warning/Danger)

### Statistics Cards
- Total registered users
- Users with personal vehicles
- Active foreign tourists
- E-FIR count
- Users in dangerous areas
- Active trip users
- Dangerous areas alert section

## Data Structure

The dashboard uses dummy data located in `src/data/dummyData.js`. Replace this with your backend API integration:

- `sosCalls`: Emergency call information
- `userMarkers`: Tourist location data
- `statistics`: Dashboard counters
- `dangerousAreas`: Risk area information

## Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:
- `accent-blue`: Primary accent color
- `accent-red`: Danger/alert color
- `accent-green`: Safe status color
- `accent-yellow`: Warning status color

### Map Styling
Update map styles in `src/components/MapSection.js` for different themes.

### Layout
Adjust grid layouts in components for different screen sizes.

## API Integration

To connect with your backend:

1. Replace dummy data imports with API calls
2. Add data fetching logic using useEffect
3. Implement real-time updates with WebSocket or polling
4. Add error handling and loading states

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Notes

- Keep your Google Maps API key secure
- Implement proper authentication for production
- Add rate limiting for API calls
- Use HTTPS in production

## License

This project is for educational and demonstration purposes.
