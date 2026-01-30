const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let client; 

const initDb = async () => {
    if (client) return client;
    
    client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
};

const getDb = () => {
    if (!client) {
        throw new Error('Database not initialized');
    }
    return client.db(process.env.DB_NAME);
};

module.exports = {
    initDb,
    getDb
};