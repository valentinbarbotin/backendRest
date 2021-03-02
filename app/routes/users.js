const express = require('express');
const router = express.Router();
const checkIP = require('../middleware/checkIP');
const Users = require('../controllers/users');

router.post('/register', checkIP, Users.register );
router.post('/login', checkIP, Users.login );
router.get('/verify/:token', checkIP, Users.verifyToken );

module.exports = router;