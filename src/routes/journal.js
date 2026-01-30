const router = require('express').Router();
const journalController = require('../controllers/journal');
const { validateJournal } = require('../middleware/validateJournal');

router.get('/', journalController.getAllEntries);

router.get('/:id', journalController.getSingleEntry);

router.post('/', validateJournal, journalController.createEntry);

router.put('/:id', validateJournal, journalController.updateEntry);

router.delete('/:id', journalController.deleteEntry);

module.exports = router;
