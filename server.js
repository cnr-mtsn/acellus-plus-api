// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 4000;

const app = express();
// adding Helmet to enhance your API's security
// using bodyParser to parse JSON bodies into JS objects
// enabling CORS for all requests
// adding morgan to log HTTP requests
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

// importing arrays to act as db -temporary solution
const courses = require("./schema/courses");
const resources = require("./schema/resources");
const textbook = require("./schema/textbooks");
/****** API ROUTES  ******/

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
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
