const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;