const router = require('express').Router();
const habitsController = require('../controllers/habits');
const { validateHabit } = require('../middleware/validateHabit');

router.get('/', habitsController.getAllHabits);

router.get('/:id', habitsController.getSingle);

router.post('/', validateHabit, habitsController.createHabit);

router.put('/:id', validateHabit, habitsController.updateHabit);

router.delete('/:id', habitsController.deleteHabit);

module.exports = router;

