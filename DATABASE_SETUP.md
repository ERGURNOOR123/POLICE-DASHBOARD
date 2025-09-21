# Police Dashboard - Database & Excel Integration Setup

This guide will help you connect your Police Dashboard with a database and Excel files.

## 🚀 Quick Start

### Option 1: Database + Excel Integration (Recommended)

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

3. **Start the Frontend**
   ```bash
   cd ..  # Go back to project root
   npm start
   ```

4. **Access the Dashboard**
   - Frontend: `http://localhost:3000`
   - API Health Check: `http://localhost:5000/api/health`

## 📊 Database Features

### SQLite Database
- **Location**: `backend/database/police_dashboard.db`
- **Tables**: 
  - `sos_calls` - Emergency calls data
  - `user_markers` - User location markers
  - `statistics` - Dashboard statistics
  - `dangerous_areas` - High-risk areas

### API Endpoints

#### SOS Calls
- `GET /api/sos` - Get all SOS calls
- `GET /api/sos/active` - Get active SOS calls
- `POST /api/sos` - Create new SOS call
- `PUT /api/sos/:id/status` - Update call status
- `DELETE /api/sos/:id` - Delete SOS call

#### User Markers
- `GET /api/users` - Get all user markers
- `GET /api/users/status/:status` - Get users by status
- `POST /api/users` - Create user marker
- `PUT /api/users/:id` - Update user marker
- `DELETE /api/users/:id` - Delete user marker

#### Statistics
- `GET /api/stats` - Get statistics
- `PUT /api/stats` - Update statistics
- `GET /api/stats/dangerous-areas` - Get dangerous areas
- `POST /api/stats/dangerous-areas` - Add dangerous area

#### Excel Import
- `POST /api/import/excel` - Import Excel file

## 📁 Excel Integration

### Supported File Formats
- `.xlsx` (Excel 2007+)
- `.xls` (Excel 97-2003)

### Required Excel Sheets

#### 1. SOS_Calls Sheet
| Column | Description | Example |
|--------|-------------|---------|
| Time | Call time | 14:32 |
| Location | Call location | Taj Mahal, Agra |
| Type | Emergency type | Medical Emergency |
| Status | Call status | active |
| Phone | Caller phone | +91 98765 43210 |
| EmergencyPhone | Emergency contact | +91 100 |

#### 2. User_Markers Sheet
| Column | Description | Example |
|--------|-------------|---------|
| Name | User name | John Smith |
| Latitude | GPS latitude | 28.6139 |
| Longitude | GPS longitude | 77.2090 |
| Type | User type | tourist |
| Nationality | User nationality | USA |
| Vehicle | Transport type | Personal |
| Status | User status | safe |
| LastSeen | Last seen time | 2 min ago |

#### 3. Statistics Sheet
| Column | Description | Example |
|--------|-------------|---------|
| TotalUsers | Total registered users | 1247 |
| PersonalVehicleUsers | Users with personal vehicles | 892 |
| ActiveForeigners | Active foreign users | 156 |
| EFIRCount | E-FIR reports count | 23 |
| DangerousAreaUsers | Users in dangerous areas | 8 |
| ActiveTripUsers | Users currently traveling | 445 |

#### 4. Dangerous_Areas Sheet
| Column | Description | Example |
|--------|-------------|---------|
| Name | Area name | Downtown Mumbai |
| RiskLevel | Risk level | High |
| UserCount | Users in area | 3 |

### Excel Import Process

1. **Prepare your Excel file** with the required sheets
2. **Click "Import/Export"** in the dashboard header
3. **Click "Select Excel File"** and choose your file
4. **Wait for import** - you'll see a success/error message
5. **Data is automatically updated** in the dashboard

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
```

### Frontend Configuration

The frontend automatically connects to the API. If your backend runs on a different port, update the API URL in `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## 🛠️ Alternative Database Options

### PostgreSQL (Production)

1. **Install PostgreSQL**
2. **Update database connection** in `backend/database/db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'police_dashboard',
  password: 'your_password',
  port: 5432,
});
```

### MySQL

1. **Install MySQL**
2. **Update database connection** in `backend/database/db.js`:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'police_dashboard'
});
```

## 📱 Offline Mode

The dashboard automatically falls back to dummy data when the API is not available:

- **Green indicator**: API connected, using live data
- **Yellow indicator**: Offline mode, using dummy data
- **Red indicator**: Error loading data

## 🔍 Troubleshooting

### Common Issues

1. **"API connection failed"**
   - Ensure backend server is running on port 5000
   - Check if port 5000 is available
   - Verify no firewall blocking the connection

2. **"Excel import failed"**
   - Check file format (.xlsx or .xls)
   - Ensure all required sheets exist
   - Verify column names match exactly

3. **"Database error"**
   - Check if SQLite file is writable
   - Ensure backend has proper permissions
   - Restart the backend server

### Logs

Check the backend console for detailed error messages:
```bash
cd backend
npm run dev
```

## 🚀 Production Deployment

### Backend Deployment

1. **Set production environment**:
   ```bash
   export NODE_ENV=production
   ```

2. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name police-dashboard-api
   ```

3. **Configure reverse proxy** (Nginx):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location /api {
           proxy_pass http://localhost:5000;
       }
   }
   ```

### Frontend Deployment

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy to static hosting** (Netlify, Vercel, etc.)

3. **Update API URL** for production:
   ```bash
   REACT_APP_API_URL=https://your-api-domain.com/api npm run build
   ```

## 📞 Support

For issues or questions:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure ports 3000 and 5000 are available
4. Check file permissions for database and uploads

## 🔄 Data Backup

### Database Backup
```bash
# SQLite backup
cp backend/database/police_dashboard.db backup_$(date +%Y%m%d).db
```

### Excel Export
Use the "Download Template" feature to get CSV templates that can be converted to Excel format.

---

**Note**: This setup provides both database connectivity and Excel import/export functionality. The dashboard will work offline with dummy data and automatically switch to live data when the API is available.
