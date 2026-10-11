const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/admin.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.use(protect, adminOnly);

router.get('/dashboard', getDashboardStats);

module.exports = router;
