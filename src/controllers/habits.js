const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllHabits = async (req, res) => {
    //#swagger.tags=['Habits']
    const result = await mongodb.getDb().collection('habitLogs').find();
    result.toArray().then((habits) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(habits)
    })
};


const getSingle = async (req, res) => {
    //#swagger.tags=['Habits']
    const habitId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('habitLogs').find( {_id: habitId});
    result.toArray().then((habits) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(habits)
    })
}; 

module.exports = {
    getAllHabits,
    getSingle
};