const router = require('express').Router();
const { signUp, logIn } = require('../controllers/authController');

router.post('/signup',signUp);
router.post('/login', logIn);

module.exports = router;