const express = require('express');
const router = express.Router();

const checkIP = require('../middleware/checkIP');
const checkAuthorization = require('../middleware/checkAuthorization');
const checkJWT = require('../middleware/checkJWT');
const API = require('../controllers/API');

router.get('', checkIP, checkJWT, API.index );
// router.get('', checkIP, checkAuthorization, API.index );
router.get('/test', checkIP, API.test );

module.exports = router;