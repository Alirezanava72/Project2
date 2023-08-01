const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Databse connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;