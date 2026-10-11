const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'CLIENT_URL'];
  const missingEnv = requiredEnv.filter(env => !process.env[env]);
  if (missingEnv.length > 0) {
    console.error(`FATAL ERROR: Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
  }
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');
const { initSocket } = require('./socket');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// CORS config
const { corsOriginHandler } = require('./config/cors');

app.use(cors({
  origin: corsOriginHandler,
  credentials: true,
}));

// Request parsing
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
