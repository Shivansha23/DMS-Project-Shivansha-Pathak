# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Prerequisites Check
```bash
# Check Node.js (should be v18+)
node --version

# Check npm
npm --version

# Check if MongoDB is installed
mongod --version
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 3: Configure Environment

Create `.env` file in `backend/` folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dms
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
```

### Step 4: Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo service mongod start
# or
brew services start mongodb-community
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
📝 Environment: development
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Wait for compilation, then open: `http://localhost:4200`

### Step 6: Create Your First User

1. Click "Register here"
2. Fill in:
   - Name: `Admin User`
   - Email: `admin@dms.com`
   - Password: `admin123`
   - Role: `admin`
3. Click Register

### Step 7: Upload Your First Document

1. After login, click "Upload Document"
2. Choose a file from your computer
3. Add a title and tags
4. Click Upload

🎉 **Congratulations!** Your DMS is now running!

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Failed
1. Make sure MongoDB is running
2. Check if port 27017 is available
3. Verify MONGODB_URI in .env

### Cannot Find Module
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
- Make sure backend is running on port 5000
- Check frontend environment.ts has correct API URL

---

## 📝 Default Test Credentials

After manual registration, use these for testing:

**Admin:**
- Email: `admin@dms.com`
- Password: `admin123`

**Editor:**
- Email: `editor@dms.com`
- Password: `editor123`

**Viewer:**
- Email: `viewer@dms.com`
- Password: `viewer123`

---

## 🎯 Next Steps

1. ✅ Explore the dashboard
2. ✅ Upload different file types
3. ✅ Test search functionality
4. ✅ Try different user roles
5. ✅ Check document versioning
6. ✅ Test permissions management

---

## 📚 Documentation

- [Full README](README.md) - Complete documentation
- [API Testing Guide](API_TESTING.md) - Test APIs with Postman
- [Development Guide](DEVELOPMENT.md) - Development best practices

---

## 🆘 Need Help?

1. Check the [README](README.md) for detailed information
2. Review error messages in terminal
3. Check browser console (F12)
4. Verify all services are running

---

**Happy coding! 🚀**
