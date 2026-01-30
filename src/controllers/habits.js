const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllHabits = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const result = await mongodb.getDb().collection('habitLogs').find();     
        result.toArray().then((habits) => {        
            res.setHeader('Content-Type', 'application/json');        
            res.status(200).json(habits);      
        })
        .catch((err) => {          
            res.status(500).json({ message: err.message });    
        });

    } catch (err) {   
        res.status(500).json({ message: err.message });  
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const habitId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('habitLogs').find({ _id: habitId });
        result.toArray().then((habits) => {
             if (!habits.length) {
                return res.status(404).json({ message: 'Habit not found' });    
            }
      
            res.setHeader('Content-Type', 'application/json');     
            res.status(200).json(habits);     
        })
        .catch((err) => {      
            res.status(500).json({ message: err.message });   
        });
    } catch (err) { 
        res.status(400).json({ message: 'Invalid habit id' });
    }
};

module.exports = {
    getAllHabits,
    getSingle
};