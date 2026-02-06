const router = require('express').Router();
const journalController = require('../controllers/journal');
const { validateJournal } = require('../middleware/validateJournal');
const { requireLogin } = require('../middleware/requireLogin');

router.get('/', journalController.getAllEntries);

router.get('/:id', journalController.getSingleEntry);


router.post('/', requireLogin, validateJournal, journalController.createEntry);

router.put('/:id', requireLogin, validateJournal, journalController.updateEntry);

router.delete('/:id', requireLogin, journalController.deleteEntry);

module.exports = router;
