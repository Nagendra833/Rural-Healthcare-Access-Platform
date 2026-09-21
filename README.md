# Rural Healthcare Access Platform

A full-stack web application that connects patients, doctors, and community health workers in rural areas — with appointment booking, medical records, an AI health assistant, emergency information, and an admin panel.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Lucide React icons, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **AI:** Google Gemini API (`@google/generative-ai`)

## Project Structure

```
rural-healthcare-platform/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handler logic
│   ├── routes/           # Express routers
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Auth, error handling, file uploads
│   ├── utils/             # Helpers (JWT, async handler)
│   ├── seed/              # Sample data seed script
│   └── server.js         # App entry point
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/          # Route-level pages
    │   ├── context/        # Auth & Toast context (Context API)
    │   ├── hooks/           # Custom hooks
    │   ├── services/       # Axios API service modules
    │   └── utils/           # Formatters & validators
    └── index.html
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either a local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [Google Gemini API key](https://ai.google.dev) for the AI Health Assistant feature

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your values:

```
MONGO_URI=mongodb://localhost:27017/rural_healthcare
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Seed the database with sample users, appointments, health tips, and emergency contacts:

```bash
npm run seed
```

This creates one account per role:

| Role          | Email                        | Password     |
|---------------|-------------------------------|--------------|
| Admin         | admin@ruralhealth.org         | Admin@123    |
| Doctor        | doctor@ruralhealth.org        | Doctor@123   |
| Health Worker | worker@ruralhealth.org        | Worker@123   |
| Patient       | patient@ruralhealth.org       | Patient@123  |

Start the backend:

```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start
```

The API will run at `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

## 2. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

The default `.env` points to `VITE_API_BASE_URL=http://localhost:5000/api`, which matches the backend above. In development, Vite also proxies `/api` and `/uploads` to `http://localhost:5000`, so the app works even without setting the env var.

Start the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 3. Using the App

1. Register a new account (as Patient, Doctor, or Health Worker) or log in with one of the seeded accounts above.
2. **Doctors** must be approved by an Admin before they can log in — use the seeded doctor account (already approved) or log in as Admin and approve a new doctor from **Approve Doctors**.
3. Explore role-specific dashboards, book/manage appointments, chat with the AI Health Assistant, upload medical records, and more.

## API Overview

| Method | Endpoint                          | Description                          |
|--------|------------------------------------|---------------------------------------|
| POST   | `/api/auth/register`              | Register a new user                   |
| POST   | `/api/auth/login`                 | Log in                                |
| POST   | `/api/auth/logout`                | Log out                               |
| GET    | `/api/users/profile`              | Get own profile                       |
| PUT    | `/api/users/profile`              | Update own profile                    |
| GET    | `/api/users/doctors`              | List approved doctors                 |
| GET    | `/api/appointments`               | List appointments (role-filtered)     |
| POST   | `/api/appointments`               | Book an appointment                   |
| PUT    | `/api/appointments/:id`           | Update/reschedule an appointment      |
| DELETE | `/api/appointments/:id`           | Cancel an appointment                 |
| GET    | `/api/records`                    | List medical records                  |
| POST   | `/api/records`                    | Upload a medical record (multipart)   |
| POST   | `/api/ai/chat`                    | Chat with the Gemini AI assistant     |
| GET    | `/api/emergency`                  | List emergency contacts               |
| GET    | `/api/tips`                       | List health tips                      |
| GET/POST | `/api/health-worker/vaccinations` | Vaccination tracking                |
| GET/POST | `/api/health-worker/home-visits`  | Home visit scheduling               |
| GET/POST | `/api/health-worker/reports`      | Village report submission           |
| GET/POST | `/api/prescriptions`              | Prescription management             |
| GET    | `/api/admin/analytics`            | Admin dashboard analytics             |
| GET    | `/api/admin/reports`              | All village reports (admin view)      |
| GET/PUT/DELETE | `/api/users`, `/api/users/:id`, `/api/users/:id/approve` | Admin user management |

All routes except `/api/auth/*` require a `Authorization: Bearer <token>` header.

## Notes

- The AI Health Assistant always displays the disclaimer: *"AI responses are for educational purposes only and are not a substitute for professional medical advice."*
- Uploaded medical record files are stored under `backend/uploads/` and served statically at `/uploads/<filename>`. For production, swap this for a cloud storage provider (S3, Cloudinary, etc.).
- Passwords are hashed with bcrypt before being stored; the JWT is stored in `localStorage` on the client. For production hardening, consider moving to httpOnly cookies.
- The "Forgot Password" page currently simulates the reset-link flow — wire it to a real email-sending endpoint before going to production.

## Building for Production

```bash
# Frontend
cd frontend
npm run build       # outputs to frontend/dist
npm run preview     # preview the production build locally

# Backend
cd backend
NODE_ENV=production npm start
```

Deploy the backend (e.g. Render, Railway, EC2) and the frontend `dist/` folder (e.g. Vercel, Netlify), pointing `VITE_API_BASE_URL` at your deployed backend's `/api` URL and `CLIENT_URL` on the backend at your deployed frontend's origin.
