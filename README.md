# 📁 Document Management System (DMS)

A full-stack Document Management System built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) featuring secure authentication, role-based access control, cloud storage integration, and advanced document management capabilities.

![Tech Stack](https://img.shields.io/badge/Stack-MEAN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

---
## 📸 Screenshots

### Register Page
![Register Page](./screenshots/register.png)

### Login Page
![Login Page](./screenshots/login.png)

### Upload Page
![Register Page](./screenshots/upload.png)

### Dashboard
![Login Page](./screenshots/dashboard.png)

![Login Page](./screenshots/docdetails.png)

## 🚀 Features

### Core Features
- ✅ **User Authentication & Authorization** - JWT-based secure authentication with role-based access (Admin, Editor, Viewer)
- ✅ **Document Upload & Management** - Upload, view, update, and delete documents
- ✅ **Cloud Storage Integration** - Cloudflare R2 for scalable, cost-effective file storage
- ✅ **Advanced Search & Filter** - Search by title, tags, and metadata with sorting options
- ✅ **Permission Management** - Granular access control with view and edit permissions
- ✅ **Version Control** - Track document versions with complete history
- ✅ **Responsive UI** - Mobile-first design with Angular Material
- ✅ **File Type Validation** - Support for multiple file types with size limits
- ✅ **Real-time Updates** - Dynamic document list with filters

### Security Features
- 🔒 Password hashing with bcrypt
- 🔒 JWT token-based authentication
- 🔒 Protected API routes with middleware
- 🔒 Role-based route guards
- 🔒 File type and size validation
- 🔒 CORS protection

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐
│  Angular UI     │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express.js     │
│  (Backend API)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼────────────┐
│MongoDB│  │Cloudflare R2  │
│       │  │Object Storage │
└───────┘  └───────────────┘
```

### Technology Stack

**Frontend:**
- Angular 17 (Standalone Components)
- Angular Material UI
- RxJS for reactive programming
- TypeScript

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- AWS SDK S3 (for R2 compatibility)

**Cloud Services:**
- Google Cloud Storage (GCS)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (v6 or higher) or MongoDB Atlas account
- Angular CLI (`npm install -g @angular/cli`)
- Cloudflare account (for R2 - optional but recommended)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DMS
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required: MongoDB URI, JWT Secret
# Optional: Cloudflare R2 credentials
```

**Environment Variables (.env):**
```env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dms
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dms

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Cloudflare R2 (Optional)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.r2.dev

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
```

### 3. Cloudflare R2 Setup (Optional)

**For detailed R2 setup instructions, see [R2_SETUP.md](R2_SETUP.md)**

Quick steps:
1. Create a Cloudflare account
2. Go to R2 and create a bucket
3. Generate API tokens (Access Key ID & Secret Key)
4. Update `.env` with your R2 credentials

**Note:** If R2 is not configured, files will be stored locally in the `uploads/` folder.

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Update environment if needed
# Edit src/environments/environment.ts
```

---

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend
npm start
# or
ng serve
```

The Angular app will start on `http://localhost:4200`

---

## 📱 Usage Guide

### 1. Register a New Account
- Navigate to `http://localhost:4200`
- Click "Register here"
- Fill in your details and select a role (Viewer, Editor, or Admin)
- Submit to create your account

### 2. Login
- Use your credentials to login
- You'll be redirected to the dashboard

### 3. Upload Documents (Editor/Admin only)
- Click "Upload Document" button
- Select a file
- Add title, description, and tags
- Submit to upload

### 4. Search & Filter
- Use the search bar to find documents by title or filename
- Filter by tags
- Sort by date, title, or size

### 5. View Document Details
- Click on any document card
- View metadata, versions, and permissions
- Download or delete (if you have permission)

### 6. Manage Permissions
- Document owners and admins can manage who can view/edit documents

---

## 🎯 User Roles

| Role    | Permissions                                      |
|---------|--------------------------------------------------|
| Admin   | Full access - can view, edit, delete all docs    |
| Editor  | Can upload, view own docs, view shared docs      |
| Viewer  | Can only view documents shared with them         |

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
GET    /api/auth/users       - Get all users (Admin only)
```

### Documents
```
POST   /api/documents/upload          - Upload document
GET    /api/documents                 - Get all documents (with filters)
GET    /api/documents/:id             - Get single document
PUT    /api/documents/:id             - Update document (new version)
DELETE /api/documents/:id             - Delete document
GET    /api/documents/:id/versions    - Get document versions
PUT    /api/documents/:id/permissions - Update permissions
```

---

## 📁 Project Structure

```
DMS/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudStorage.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── documentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── documentRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── login/
    │   │   │   ├── register/
    │   │   │   ├── dashboard/
    │   │   │   ├── upload/
    │   │   │   └── document-details/
    │   │   ├── guards/
    │   │   │   ├── auth.guard.ts
    │   │   │   └── role.guard.ts
    │   │   ├── services/
    │   │   │   ├── auth.service.ts
    │   │   │   ├── document.service.ts
    │   │   │   └── auth.interceptor.ts
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   ├── environments/
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## 🧪 Testing

### Test User Credentials (After Registration)
Create test users with different roles to test the application:

```
Admin User:
- Email: admin@dms.com
- Password: admin123
- Role: admin

Editor User:
- Email: editor@dms.com
- Password: editor123
- Role: editor

Viewer User:
- Email: viewer@dms.com
- Password: viewer123
- Role: viewer
```

---

## 🔧 Configuration

### Supported File Types
By default, the following file types are supported:
- Documents: PDF, DOC, DOCX, TXT
- Images: JPG, PNG, JPEG
- Spreadsheets: XLSX
- Presentations: PPTX

You can modify this in `.env`:
```env
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,jpg,png,jpeg,xlsx,pptx
```

### File Size Limit
Default: 10MB (10485760 bytes)

Modify in `.env`:
```env
MAX_FILE_SIZE=10485760
```

---

## 🚀 Deployment

### Backend Deployment (Node.js)

1. **Heroku:**
```bash
heroku create dms-backend
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

2. **Railway/Render:** Follow platform-specific deployment guides

### Frontend Deployment (Angular)

1. **Build for Production:**
```bash
cd frontend
ng build --configuration production
```

2. **Deploy to Netlify/Vercel:**
- Connect your repository
- Set build command: `ng build --configuration production`
- Set publish directory: `dist/dms-frontend`

### Database Deployment
- Use MongoDB Atlas for cloud database
- Update MONGODB_URI in environment variables

---

## 🎓 Key Learning Outcomes

This project demonstrates:
- ✅ Full-stack MEAN development
- ✅ RESTful API design and implementation
- ✅ JWT authentication and authorization
- ✅ Cloud storage integration (GCS)
- ✅ File upload handling with Multer
- ✅ Role-based access control
- ✅ Angular reactive forms and routing
- ✅ Material Design implementation
- ✅ MongoDB data modeling with Mongoose
- ✅ Responsive web design
- ✅ Security best practices

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Created as a comprehensive Document Management System demonstration.

---

## 🙏 Acknowledgments

- Inspired by Google Drive and SharePoint
- Built with MEAN stack
- Uses Angular Material for UI components
- Google Cloud Storage for scalable file storage

---

## 📞 Support

For questions or issues:
- Open an issue in the repository
- Check the documentation above
- Review the code comments

---

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Real-time collaboration
- [ ] Document preview (PDF, images)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Audit logs
- [ ] Bulk operations
- [ ] Advanced search with full-text indexing
- [ ] Document sharing via links
- [ ] Two-factor authentication
- [ ] Dark mode

---

## ⚡ Quick Start Checklist

- [ ] Install Node.js and MongoDB
- [ ] Clone the repository
- [ ] Install backend dependencies (`cd backend && npm install`)
- [ ] Install frontend dependencies (`cd frontend && npm install`)
- [ ] Create `.env` file in backend
- [ ] Configure MongoDB URI and JWT secret
- [ ] Start MongoDB service
- [ ] Start backend server (`npm start`)
- [ ] Start frontend app (`ng serve`)
- [ ] Register a new user
- [ ] Upload your first document!

---

Made By: Shivansha Pathak
Email: shivanshapathak2022@vitbhopal.ac.in

