
const {  MongoClient }= require('mongodb')

const PARAMS = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};
const URI = 'mongodb://localhost:27017'

let connection

const connectMongo = async () => {
   connection = await MongoClient.connect(URI, PARAMS);
   console.log('Mongodb Connected');
}

const getConnection = () => {
    return connection;
 }
 
 

module.exports = { connectMongo , getConnection }
