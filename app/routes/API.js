const express = require('express');
const router = express.Router();
const checkIP = require('../middleware/checkIP');
const API = require('../controllers/API');

router.get('', checkIP, API.index );
router.get('/test', checkIP, API.test );

module.exports = router;