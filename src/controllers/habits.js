const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllHabits = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const result = await mongodb.getDb().collection('habitLogs').find();
        const habits = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(habits);
    } catch (err) {   
        res.status(500).json({ message: err.message });  
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid habit id' });
        }
        //#swagger.tags=['Habits']
        const habitId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('habitLogs').find({ _id: habitId });
        const habits = await result.toArray();
        if (!habits.length) {
            return res.status(404).json({ message: 'Habit not found' });    
        }
      
        res.setHeader('Content-Type', 'application/json');     
        res.status(200).json(habits);     
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
};

const createHabit = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const habit = req.body;
        const response = await mongodb.getDb().collection('habitLogs').insertOne(habit);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create habit log' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateHabit = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid habit id' });
        }
        //#swagger.tags=['Habits']
        const habitId = new ObjectId(req.params.id);
        const habit = req.body;
        const response = await mongodb.getDb().collection('habitLogs').replaceOne({ _id: habitId }, habit);
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Habit not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteHabit = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid habit id' });
        }
        //#swagger.tags=['Habits']
        const habitId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('habitLogs').deleteOne({ _id: habitId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Habit not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllHabits,
    getSingle,
    createHabit,
    updateHabit,
    deleteHabit
};