const express = require('express');
const multer = require('multer');
const router = express.Router();

const checkIP = require('../middleware/checkIP');
const Users = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/scrypteur')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })


const upload = multer({ dest: 'uploads/', storage: storage})


router.post('/upload', checkIP, upload.array('file'), Users.index );

router.post('/register', checkIP, Users.register );
router.post('/login', checkIP, Users.login );
router.get('/verify/:token', checkIP, Users.verifyToken );

module.exports = router;