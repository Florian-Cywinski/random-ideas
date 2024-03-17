const mongoose = require('mongoose'); // To bring in the installed module ('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI); // await because mongoose.connect() returns a promise
  console.log(`MongoDB Connected: ${conn.connection.host}`);  // Just to know that we are connected
};

mongoose.set('strictQuery', true);  // To just allow strict queries (that are in the schema of the DB (randomideas)) and suppress the warning in the terminal

module.exports = connectDB; // To export this function as default