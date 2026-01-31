const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Mind & Habit Tracker API');
});

router.use('/habits', require('./habits'));
router.use('/journal', require('./journal'));
module.exports = router;
