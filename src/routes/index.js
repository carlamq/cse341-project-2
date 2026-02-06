const router = require('express').Router();

router.use('/habits', require('./habits'));
router.use('/journal', require('./journal'));
router.use('/auth', require('./auth'));

module.exports = router;
