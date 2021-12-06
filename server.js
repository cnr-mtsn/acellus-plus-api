// importing the dependencies
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

// const url = `mongodb://conner:${process.env.MONGO_DB_PASSWORD}@acellus-plus-db-dev.z2tdi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
// MongoClient.connect(url, (err, client) => {
// 	if (err) console.log(err);
// 	const db = client.db("acellus-plus-db-dev");
// 	var data = db.collection("courses").find({});
// 	console.log(data ? data : "no data dummy");
// });

// adding Helmet to enhance security
// using bodyParser to parse JSON bodies into JS objects
// enabling CORS for all requests
// adding morgan to log HTTP requests
const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("@:remote-addr | :method | :url | :status | in :total-time ms | :user-agent"));

// importing arrays to act as db -temporary solution

const courses = require("./schema/courses");
const resources = require("./schema/resources");
const textbook = require("./schema/textbooks");
/****** API ROUTES  ******/
app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});
// return courses
app.get("/api/courses", (req, res) => {
	res.send(courses);
});
// return resources
app.get("/api/resources", (req, res) => {
	res.send(resources);
});
// return resources
app.get("/api/textbook", (req, res) => {
	res.send(textbook);
});
/****** API ROUTES  ******/

// starting the server
app.listen(process.env.PORT || 4000, () => {
	console.log(`listening at [ http://localhost:${process.env.PORT || 4000} ]`);
});
