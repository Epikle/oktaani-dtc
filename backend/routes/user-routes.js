const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//Path is /api/user
router.post('/login', userControllers.login);

router.use(checkAuth);

router.post(
  '/signup',
  [check('name').not().isEmpty(), check('password').isLength({ min: 6 })],
  userControllers.signup
);

router.delete('/:id', userControllers.deleteUser);

module.exports = router;
