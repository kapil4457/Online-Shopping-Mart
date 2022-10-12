const app = require("./app");
const connectDatabase = require("./database");


const dotenv = require("dotenv");

dotenv.config();

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(err.message);
	console.log("Shutting down due to unhandled Promise Rejection ");
	process.exit(1);
});



connectDatabase();


const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error  :${err.message}`);
	console.log("Shutting down due to unhandled Promise Rejection ");
	server.close(() => {
		process.exit(1);
	});
});