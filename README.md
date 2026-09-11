# 🩺 Medical Records Tracker

A full-stack MERN application to securely add, view, edit, and manage personal medical records — prescriptions, scans, doctor visits, and more — all in one place.

**Live App:** [medical-records-tracker-lac.vercel.app](https://medical-records-tracker-lac.vercel.app)
**Backend API:** [medical-records-tracker-4zil.onrender.com](https://medical-records-tracker-4zil.onrender.com)

> ⚠️ The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–50 seconds to respond.

---

## ✨ Features

- 🔐 Secure user authentication (signup/login) with JWT stored in HTTP-only cookies
- 📝 Add, edit, and delete medical records (title, doctor, hospital, body organ, medicines, notes)
- 📎 Attach and view files (prescriptions, scans, reports) via Cloudinary
- 🔀 Sort records by date, doctor, title, hospital, or body organ
- 📱 Responsive UI built with React Bootstrap

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Bootstrap, React Router |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Auth | JWT + HTTP-only cookies, bcrypt password hashing |
| File Storage | Cloudinary |
| Hosting | Vercel (frontend) · Render (backend) |

---

## 📁 Project Structure

```
Medical-records-Tracker/
├── backend/
│   ├── config/          # DB and Cloudinary configuration
│   ├── controller/      # Route handlers (auth, records)
│   ├── middleware/      # Auth middleware, file upload (multer + Cloudinary)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   └── server.js        # App entry point
└── frontend/
    ├── src/
    │   ├── assets/       # Images
    │   ├── App.jsx
    │   └── main.jsx
    ├── pages/            # Route-level pages (Home, Login, Signup, Add/View records)
    └── components/       # Reusable UI components
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas connection string (or local MongoDB instance)
- A Cloudinary account (for file uploads)

### 1. Clone the repository
```bash
git clone https://github.com/ishitamangla/Medical-records-Tracker.git
cd Medical-records-Tracker
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `backend/.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_jwt_secret
NODE_ENV=development
FRONTEND_URL=

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
```

Create a `frontend/.env` file:
```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173`, connected to the backend at `http://localhost:3000`.

---

## 🌐 Deployment

This project is deployed with:
- **Backend → [Render](https://render.com)** — root directory `backend`, build command `npm install`, start command `npm start`
- **Frontend → [Vercel](https://vercel.com)** — root directory `frontend`, framework preset Vite

### Required environment variables

**Render (backend)**
| Key | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Random secret used to sign JWTs |
| `NODE_ENV` | Set to `production` |
| `FRONTEND_URL` | Your deployed Vercel URL (no trailing slash) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary credentials |

**Vercel (frontend)**
| Key | Description |
|---|---|
| `VITE_API_URL` | Your deployed Render backend URL |

> Deploy the backend first, then the frontend, then update `FRONTEND_URL` on Render with the final Vercel URL and redeploy.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/register` | Create a new user account | No |
| POST | `/login` | Log in and receive auth cookie | No |
| GET | `/verify` | Verify current session | Yes |
| POST | `/add-details` | Add a new medical record (with optional file uploads) | Yes |
| GET | `/fetch-details` | Fetch all records for the logged-in user | Yes |
| PUT | `/edit-details/:id` | Update an existing record | Yes |
| DELETE | `/delete-details/:id` | Delete a record | Yes |

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt before storage.
- Auth tokens are stored in HTTP-only, `secure`, `SameSite=None` cookies in production, preventing access via client-side JavaScript.
- File uploads go directly to Cloudinary — no files are stored on the server's local disk.

---

## 📄 License

This project is open source and available for personal and educational use.
