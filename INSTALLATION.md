# 🚀 Installation Commands - Copy & Paste Ready

## Prerequisites Installation

### Install Node.js
Visit: https://nodejs.org/
Download LTS version (v18 or higher)

### Install MongoDB
**Windows:**
Visit: https://www.mongodb.com/try/download/community
Download MSI installer

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Install Angular CLI
```bash
npm install -g @angular/cli
```

---

## Project Setup - Complete Copy & Paste Commands

### 1. Navigate to Project
```bash
cd "c:\Users\shiva\OneDrive\Documents\GitHub\Shivansha23\DMS"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Create .env file (Windows PowerShell):**
```powershell
@"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dms
JWT_SECRET=dms_secret_key_2024_change_in_production
JWT_EXPIRE=7d
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=dms-documents
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
"@ | Out-File -FilePath .env -Encoding UTF8
```

**Create .env file (macOS/Linux/Git Bash):**
```bash
cat > .env << EOL
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dms
JWT_SECRET=dms_secret_key_2024_change_in_production
JWT_EXPIRE=7d
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=dms-documents
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
EOL
```

**Note:** Replace R2 credentials with actual values from Cloudflare. See [R2_SETUP.md](R2_SETUP.md) for details.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## Running the Application

### Option 1: Using Separate Terminals

**Terminal 1 - Start MongoDB (Windows):**
```bash
net start MongoDB
```

**Terminal 1 - Start MongoDB (macOS):**
```bash
brew services start mongodb-community
```

**Terminal 1 - Start MongoDB (Linux):**
```bash
sudo systemctl start mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm start
```

---

## One-Command Setup (After Prerequisites)

### Windows PowerShell Script
Save as `setup.ps1`:
```powershell
# Navigate to backend
Set-Location backend

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Green
npm install

# Create .env file
Write-Host "Creating .env file..." -ForegroundColor Green
@"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dms
JWT_SECRET=dms_secret_key_2024_change_in_production
JWT_EXPIRE=7d
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
"@ | Out-File -FilePath .env -Encoding UTF8

# Navigate to frontend
Set-Location ../frontend

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Green
npm install

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start MongoDB: net start MongoDB" -ForegroundColor Yellow
Write-Host "2. Terminal 1: cd backend && npm start" -ForegroundColor Yellow
Write-Host "3. Terminal 2: cd frontend && npm start" -ForegroundColor Yellow
```

Run with: `powershell -ExecutionPolicy Bypass -File setup.ps1`

### macOS/Linux Bash Script
Save as `setup.sh`:
```bash
#!/bin/bash

echo "🚀 Setting up DMS..."

# Backend setup
cd backend
echo "📦 Installing backend dependencies..."
npm install

# Create .env file
echo "⚙️ Creating .env file..."
cat > .env << EOL
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dms
JWT_SECRET=dms_secret_key_2024_change_in_production
JWT_EXPIRE=7d
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
EOL

# Frontend setup
cd ../frontend
echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: brew services start mongodb-community (macOS) or sudo systemctl start mongod (Linux)"
echo "2. Terminal 1: cd backend && npm start"
echo "3. Terminal 2: cd frontend && npm start"
```

Make executable and run:
```bash
chmod +x setup.sh
./setup.sh
```

---

## Quick Start After Setup

### Start Everything (3 commands in 3 terminals)

**Terminal 1 - MongoDB:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```

Then open: http://localhost:4200

---

## Development Mode (with auto-reload)

**Terminal 2 - Backend (dev mode):**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
ng serve --open
```

---

## Verification Commands

### Check if Everything is Installed
```bash
node --version          # Should show v18+
npm --version           # Should show 9+
mongod --version        # Should show MongoDB version
ng version             # Should show Angular CLI version
```

### Check if Services are Running
```bash
# Check if MongoDB is running (Windows)
sc query MongoDB

# Check if MongoDB is running (macOS/Linux)
ps aux | grep mongod

# Check if backend is running
curl http://localhost:5000

# Check if frontend is running
curl http://localhost:4200
```

---

## Stop Services

### Stop Backend & Frontend
Press `Ctrl + C` in the respective terminals

### Stop MongoDB
```bash
# Windows
net stop MongoDB

# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongod
```

---

## Cleanup Commands

### Remove node_modules and reinstall
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Reset Database
```bash
mongosh
use dms
db.dropDatabase()
exit
```

---

## Troubleshooting Commands

### Kill Process on Port (Windows)
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Kill Process on Port (macOS/Linux)
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

### Check MongoDB Connection
```bash
mongosh
show dbs
use dms
db.stats()
exit
```

---

## Production Build Commands

### Build Frontend for Production
```bash
cd frontend
ng build --configuration production
```

Output will be in `frontend/dist/dms-frontend/`

### Set Backend to Production Mode
Update `.env`:
```env
NODE_ENV=production
```

---

## Optional: Cloudflare R2 Setup

For detailed instructions, see [R2_SETUP.md](R2_SETUP.md)

Quick steps:
1. Create Cloudflare account at: https://dash.cloudflare.com
2. Go to R2 and create a bucket
3. Generate API tokens
4. Update `.env`:
```env
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

---

## Testing Commands

### Test Backend API
```bash
# Test health endpoint
curl http://localhost:5000

# Test register (Windows PowerShell)
Invoke-RestMethod -Uri http://localhost:5000/api/auth/register -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name":"Test User","email":"test@test.com","password":"test123","role":"viewer"}'

# Test register (macOS/Linux)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","role":"viewer"}'
```

---

## Package Versions (for reference)

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "@google-cloud/storage": "^7.7.0"
}
```

### Frontend Dependencies
```json
{
  "@angular/core": "^17.0.0",
  "@angular/material": "^17.0.0",
  "rxjs": "~7.8.0"
}
```

---

**Ready to start! Follow the commands above to get your DMS running! 🚀**
