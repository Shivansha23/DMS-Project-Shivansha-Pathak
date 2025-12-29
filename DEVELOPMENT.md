# Development Guide

## Development Workflow

### Backend Development

1. **Start MongoDB:**
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# macOS/Linux
sudo service mongod start
```

2. **Start Backend in Development Mode:**
```bash
cd backend
npm run dev
```

This will start the server with nodemon for auto-reload on changes.

3. **Testing API Endpoints:**
Use Postman, Insomnia, or Thunder Client to test APIs.
See `API_TESTING.md` for detailed endpoint documentation.

### Frontend Development

1. **Start Angular Development Server:**
```bash
cd frontend
ng serve --open
```

2. **Generate New Components:**
```bash
ng generate component components/component-name --standalone
```

3. **Generate New Services:**
```bash
ng generate service services/service-name
```

## Code Structure Guidelines

### Backend

**Controllers:**
- Handle HTTP request/response
- Call service methods
- Return appropriate status codes

**Models:**
- Define MongoDB schemas
- Add validation rules
- Include pre/post hooks

**Middleware:**
- Authentication checks
- Authorization checks
- Request validation

**Routes:**
- Define API endpoints
- Apply middleware
- Connect to controllers

### Frontend

**Components:**
- Use standalone components (Angular 17+)
- Follow single responsibility principle
- Keep templates clean

**Services:**
- Handle API communication
- Manage state when needed
- Use RxJS observables

**Guards:**
- Protect routes
- Check authentication
- Validate permissions

## Best Practices

### Backend
1. Always validate user input
2. Use try-catch for error handling
3. Return consistent response format
4. Use environment variables for config
5. Keep routes RESTful
6. Add comments for complex logic

### Frontend
1. Use TypeScript types
2. Unsubscribe from observables
3. Use async pipe when possible
4. Follow Angular style guide
5. Make components reusable
6. Handle errors gracefully

## Common Issues & Solutions

### Backend

**Issue:** MongoDB connection failed
**Solution:** Ensure MongoDB is running and URI is correct in .env

**Issue:** JWT token invalid
**Solution:** Check JWT_SECRET in .env matches between requests

**Issue:** File upload fails
**Solution:** Check file size and type limits in .env

### Frontend

**Issue:** CORS errors
**Solution:** Ensure backend has CORS enabled and correct origin

**Issue:** Auth token not sent
**Solution:** Check AuthInterceptor is properly configured

**Issue:** Route guards not working
**Solution:** Verify guard functions are correctly imported in routes

## Debugging Tips

### Backend
1. Use `console.log()` or debugger
2. Check MongoDB with MongoDB Compass
3. Test APIs individually with Postman
4. Review error messages in terminal

### Frontend
1. Use Chrome DevTools
2. Check Network tab for API calls
3. Use Angular DevTools extension
4. Review console for errors

## Database Management

### View Collections
```bash
mongosh
use dms
show collections
db.users.find()
db.documents.find()
```

### Drop Database (Reset)
```bash
mongosh
use dms
db.dropDatabase()
```

## Performance Optimization

### Backend
- Add indexes to frequently queried fields
- Use pagination for large datasets
- Implement caching where appropriate
- Optimize file upload process

### Frontend
- Use lazy loading for routes
- Implement virtual scrolling for large lists
- Optimize images and assets
- Use OnPush change detection

## Security Checklist

- [ ] Environment variables not committed
- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens properly validated
- [ ] File types and sizes validated
- [ ] CORS properly configured
- [ ] SQL injection prevented (using Mongoose)
- [ ] XSS protection enabled
- [ ] Rate limiting considered for production

## Pre-Deployment Checklist

### Backend
- [ ] Update .env with production values
- [ ] Set NODE_ENV to production
- [ ] Configure MongoDB Atlas
- [ ] Set up GCS for production
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up logging

### Frontend
- [ ] Build with production configuration
- [ ] Update API URL for production
- [ ] Optimize bundle size
- [ ] Enable service worker (if using PWA)
- [ ] Test on multiple devices
- [ ] Check accessibility

## Git Workflow

1. **Create feature branch:**
```bash
git checkout -b feature/feature-name
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "feat: add new feature"
```

3. **Push to remote:**
```bash
git push origin feature/feature-name
```

4. **Create Pull Request**

## Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks
