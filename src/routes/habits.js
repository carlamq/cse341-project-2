const router = require('express').Router();
const habitsController = require('../controllers/habits');
const { validateHabit } = require('../middleware/validateHabit');
const { requireLogin } = require('../middleware/requireLogin');

router.get('/', habitsController.getAllHabits);

router.get('/:id', habitsController.getSingle);


router.post('/', requireLogin, validateHabit, habitsController.createHabit);

router.put('/:id', requireLogin, validateHabit, habitsController.updateHabit);

router.delete('/:id', requireLogin, habitsController.deleteHabit);

module.exports = router;

