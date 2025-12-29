# 📁 Document Management System (DMS)

**Tech Stack:** MEAN (MongoDB, Express, Angular, Node.js)
**Cloud Storage:** Google Cloud Storage (Free Tier)
**Auth:** JWT
**Inspiration:** Google Drive, SharePoint

---

## 🔷 SYSTEM OVERVIEW (What you are building)

![Image](https://www.researchgate.net/publication/225829686/figure/fig11/AS%3A668345774927889%401536357458836/Document-Management-System-Architecture.png)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20200601200043/mean-stack-flow.png)

![Image](https://storage.googleapis.com/gweb-cloudblog-publish/images/architecture_with_GCP_services.max-1100x1100.png)

### High-Level Flow

```
Angular UI
   ↓
Node.js + Express APIs
   ↓
MongoDB (metadata)
   ↓
Google Cloud Storage (actual files)
```

---

## 🧠 PHASE-WISE PROJECT PLAN (FOLLOW IN THIS ORDER)

---

# 🔹 PHASE 0: Project Setup (Foundation)

### ✅ Step 0.1: Create Project Structure

```
DMS/
 ├── backend/
 │    ├── controllers/
 │    ├── models/
 │    ├── routes/
 │    ├── middleware/
 │    ├── uploads/ (temp)
 │    └── server.js
 └── frontend/
      ├── src/app/
      ├── components/
      ├── services/
      └── guards/
```

### ✅ Step 0.2: Install Dependencies

**Backend**

```bash
npm install express mongoose jsonwebtoken bcrypt multer cors dotenv
npm install @google-cloud/storage
```

**Frontend**

```bash
ng add @angular/material
```

📌 *Placement Tip:*
Mention “clean modular architecture” in interview.

---

# 🔹 PHASE 1: Authentication & Authorization (MUST DO FIRST)

### 🎯 Goal

Secure login system with **role-based access control**

---

## Step 1.1: User Model (MongoDB)

Fields:

* name
* email
* password (hashed)
* role (`admin | editor | viewer`)

### Step 1.2: Auth APIs

| API                   | Purpose            |
| --------------------- | ------------------ |
| POST `/auth/register` | Register user      |
| POST `/auth/login`    | Login & return JWT |

### Step 1.3: JWT Middleware

* Verify token
* Attach user to request
* Check role permissions

📌 Interview Line:

> “I implemented JWT-based authentication with role-based authorization.”

---

# 🔹 PHASE 2: Cloud Storage Setup (Google Cloud Storage)

### 🎯 Goal

Store files **outside server** (scalable + professional)

---

## Step 2.1: Google Cloud Setup

1. Create Google Cloud account
2. Create a **Storage Bucket**
3. Generate **Service Account key**
4. Save `key.json` in backend

### Step 2.2: Upload Service (Backend)

* Use `@google-cloud/storage`
* Upload file from Express → GCS
* Get **public/private file URL**

📌 Why this is powerful:

> You’re NOT storing files locally like beginners.

---

# 🔹 PHASE 3: Document Upload & Metadata Storage

### 🎯 Goal

Upload files + save metadata in MongoDB

---

## Step 3.1: Document Model

Fields:

* title
* tags (array)
* fileUrl
* uploadedBy
* permissions
* versions
* createdAt

### Step 3.2: Upload API

| API                      | Description       |
| ------------------------ | ----------------- |
| POST `/documents/upload` | Upload doc + tags |

Flow:

1. User uploads file
2. Backend sends file to GCS
3. Store file URL + metadata in MongoDB

📌 Evaluation Boost:

> File handling + cloud integration = ⭐⭐⭐⭐⭐

---

# 🔹 PHASE 4: Search & Filter (Very Important)

### 🎯 Goal

Allow users to quickly find documents

---

## Step 4.1: Search Options

* By document name
* By tags
* By uploaded user

### Step 4.2: MongoDB Queries

* Use `$regex` for keyword search
* Filter by tags array

API:

```
GET /documents?search=resume&tag=college
```

📌 Interview Tip:

> “Implemented optimized search using MongoDB queries and filters.”

---

# 🔹 PHASE 5: Permissions Management

### 🎯 Goal

Only authorized users can view/edit documents

---

## Step 5.1: Permissions Structure

```json
{
  "viewAccess": ["userId1"],
  "editAccess": ["userId2"]
}
```

### Step 5.2: Permission Middleware

* Check user role
* Check access list
* Block unauthorized requests

📌 Real-world relevance:
Same logic as **Google Drive sharing**

---

# 🔹 PHASE 6: Version Control (Advanced Feature ⭐)

### 🎯 Goal

Track document updates

---

## Step 6.1: Version Logic

* Upload new file
* Store old version in `versions[]`
* Increment version number

Example:

```json
versions: [
  { version: 1, fileUrl: "v1.pdf" },
  { version: 2, fileUrl: "v2.pdf" }
]
```

### Step 6.2: APIs

| API                           | Purpose            |
| ----------------------------- | ------------------ |
| PUT `/documents/:id`          | Upload new version |
| GET `/documents/:id/versions` | View versions      |

📌 Interview Gold:

> “I implemented document versioning similar to Google Docs.”

---

# 🔹 PHASE 7: Angular Frontend (Responsive UI)

### 🎯 Goal

Clean, responsive UI (MANDATORY)

---

## Pages to Build

1. **Login / Register**
2. **Dashboard**

   * Search bar
   * Filters
   * Document list
3. **Upload Document**
4. **Document Details**

   * Versions
   * Permissions
5. **Profile Page**

### UI Tools

* Angular Material
* Flexbox/Grid
* Mobile-first design

📌 Exam Rule:
❌ No responsiveness = ❌ marks

---

# 🔹 PHASE 8: Security & Validation

### Implement:

* File type validation
* Max file size
* Password hashing
* Protected routes

📌 Mention:

> “Security best practices followed.”

---

# 🔹 PHASE 9: Testing & Final Touch

### Checklist

✅ Auth working
✅ Upload to cloud
✅ Search works
✅ Permissions enforced
✅ Mobile responsive

---

# 🔹 PHASE 10: README & Submission

### README Must Include

* Project overview
* Tech stack
* Features
* Architecture diagram
* How to run locally

---