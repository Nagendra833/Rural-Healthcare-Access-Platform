// Entry point for the Rural Healthcare Access Platform backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const recordRoutes = require('./routes/recordRoutes');
const aiRoutes = require('./routes/aiRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const tipRoutes = require('./routes/tipRoutes');
const healthWorkerRoutes = require('./routes/healthWorkerRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Global middleware - dynamic CORS to support Vercel, localhost, and custom domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.CLIENT_URL === '*'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded files (medical records, profile pictures)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Welcome / Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Rural Healthcare Access Platform API is running successfully!',
    healthCheck: '/api/health',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Rural Healthcare Access Platform API is running' });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/health-worker', healthWorkerRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/admin', adminRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
