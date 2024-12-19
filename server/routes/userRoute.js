const express = require('express');
const router = express.Router();
const cors = require('cors');

//create cors
router.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            const allowOrigins = ['http://localhost:3000', 'http://localhost:3001'];
            if (allowOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Origin not allowed by CORS'));
            }
        }
    })
)
//
const { createuser, getusers } = require('../controller/userController');
const { loginUser, getprofile, logout } = require('../controller/authController');

router.post('/register', createuser);
router.post('/loginuser', loginUser)
router.get('/getusers', getusers);
router.get('/getprofile', getprofile);
router.post('/logout', logout);

module.exports = router;