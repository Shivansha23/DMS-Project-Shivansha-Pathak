const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log('🔍 Auth Middleware triggered');
    console.log('📋 Headers:', JSON.stringify(req.headers, null, 2));

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token extracted:', token.substring(0, 30) + '...');
    }

    if (!token) {
      console.log('❌ No token provided');
      console.log('❌ Authorization header:', req.headers.authorization);
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route - No token'
      });
    }

    try {
      console.log('🔍 Verifying token with secret:', process.env.JWT_SECRET.substring(0, 10) + '...');
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token verified for user ID:', decoded.id);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log('❌ User not found in database for ID:', decoded.id);
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('✅ User authenticated:', req.user.email, 'Role:', req.user.role);
      next();
    } catch (err) {
      console.log('❌ Token verification failed:', err.message);
      console.log('❌ Error details:', err);
      return res.status(401).json({
        success: false,
        message: 'Token is not valid - ' + err.message
      });
    }
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Role authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log('❌ Insufficient permissions:', req.user.role, 'needs', roles);
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    console.log('✅ Role authorization passed:', req.user.role);
    next();
  };
};