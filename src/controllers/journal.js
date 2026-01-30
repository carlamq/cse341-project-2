const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEntries = async (req, res) => {
    try {
        //#swagger.tags=['Journal']
        const result = await mongodb.getDb().collection('journalEntries').find();
        const entries = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(entries);
    } catch (err) {   
        res.status(500).json({ message: err.message });  
    }
};

const getSingleEntry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid entry id' });
        }
        //#swagger.tags=['Journal']
        const entryId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('journalEntries').find({ _id: entryId });
        const entries = await result.toArray();
        if (!entries.length) {
            return res.status(404).json({ message: 'Entry not found' });    
        }
      
        res.setHeader('Content-Type', 'application/json');     
        res.status(200).json(entries);     
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
};

const createEntry = async (req, res) => {
    try {
        //#swagger.tags=['Journal']
        const entry = req.body;
        const response = await mongodb.getDb().collection('journalEntries').insertOne(entry);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create journal entry' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEntry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid entry id' });
        }
        //#swagger.tags=['Journal']
        const entryId = new ObjectId(req.params.id);
        const entry = req.body;
        const response = await mongodb.getDb().collection('journalEntries').replaceOne({ _id: entryId }, entry);
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Entry not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEntry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid entry id' });
        }
        //#swagger.tags=['Journal']
        const entryId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('journalEntries').deleteOne({ _id: entryId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Entry not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllEntries,
    getSingleEntry,
    createEntry,
    updateEntry,
    deleteEntry
};