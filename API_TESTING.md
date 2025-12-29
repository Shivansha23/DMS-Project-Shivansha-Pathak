# Document Management System - API Testing Guide

## Setup
1. Import this collection into Postman or any REST client
2. Set base URL: `http://localhost:5000/api`
3. Update bearer token after login

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "editor"
}
```

### Login User
**POST** `/auth/login`

Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response will include a token. Copy it for subsequent requests.

### Get Current User
**GET** `/auth/me`

Headers:
```
Authorization: Bearer <your-token>
```

### Get All Users (Admin Only)
**GET** `/auth/users`

Headers:
```
Authorization: Bearer <admin-token>
```

## Document Endpoints

### Upload Document
**POST** `/documents/upload`

Headers:
```
Authorization: Bearer <your-token>
Content-Type: multipart/form-data
```

Body (form-data):
- `file`: (select file)
- `title`: "My Document"
- `description`: "Document description"
- `tags`: "tag1,tag2,tag3"

### Get All Documents
**GET** `/documents`

Query Parameters (optional):
- `search`: "keyword"
- `tag`: "tag1"
- `sortBy`: "date" | "title" | "size"

Headers:
```
Authorization: Bearer <your-token>
```

### Get Single Document
**GET** `/documents/:id`

Headers:
```
Authorization: Bearer <your-token>
```

### Update Document (New Version)
**PUT** `/documents/:id`

Headers:
```
Authorization: Bearer <your-token>
Content-Type: multipart/form-data
```

Body (form-data):
- `file`: (select new file - optional)
- `title`: "Updated Title" (optional)
- `description`: "Updated description" (optional)
- `tags`: "new,tags" (optional)

### Delete Document
**DELETE** `/documents/:id`

Headers:
```
Authorization: Bearer <your-token>
```

### Get Document Versions
**GET** `/documents/:id/versions`

Headers:
```
Authorization: Bearer <your-token>
```

### Update Permissions
**PUT** `/documents/:id/permissions`

Headers:
```
Authorization: Bearer <your-token>
```

Body (JSON):
```json
{
  "viewAccess": ["userId1", "userId2"],
  "editAccess": ["userId3"]
}
```

## Testing Scenarios

### Scenario 1: Complete Document Lifecycle
1. Register a new user
2. Login with the user
3. Upload a document
4. Search for the document
5. View document details
6. Update the document (new version)
7. Check versions
8. Delete the document

### Scenario 2: Permission Testing
1. Register two users (user1 and user2)
2. Login as user1
3. Upload a document
4. Add user2 to viewAccess
5. Login as user2
6. Try to view the document (should succeed)
7. Try to edit the document (should fail without editAccess)

### Scenario 3: Role-Based Access
1. Create admin user
2. Create editor user
3. Create viewer user
4. Test upload permissions (viewer should fail)
5. Test document access across roles
