const router = require('express').Router();
const habitsController = require('../controllers/habits');

router.get('/', habitsController.getAllHabits);
router.get('/:id', habitsController.getSingle);

module.exports = router;

