const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const { corsOriginHandler } = require('./config/cors');

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: corsOriginHandler,
      credentials: true,
      methods: ['GET', 'POST']
    }
  });

  io.use(async (socket, next) => {
    try {
      let token;
      // Socket.io can access cookies from socket.handshake.headers.cookie
      const cookieHeader = socket.handshake.headers.cookie;
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});
        token = cookies.jwt;
      }
      
      if (!token) {
        return next(new Error('Authentication error: No token'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod');
      const user = await User.findById(decoded.id).select('-passwordHash');
      
      if (!user || user.role !== 'admin') {
        return next(new Error('Authentication error: Unauthorized'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error: Token invalid'));
    }
  });

  io.on('connection', (socket) => {
    // Join a room specifically for this admin user to receive targeted notifications
    socket.join(`admin_${socket.user._id.toString()}`);
    
    // Also join a general admin room for broadcast notifications
    socket.join('admin_room');

    socket.on('disconnect', () => {
      // Automatic cleanup
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIo };
