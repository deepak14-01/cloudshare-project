require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
	mongoose.connect(process.env.MONGO_CONNECTION_URL);
	const connection = mongoose.connection;

	connection.once('open', () => {
		console.log("Database connected.")
	}).on('error', err => {
		console.log('Connection Failed!');
	});
}

module.exports = connectDB;