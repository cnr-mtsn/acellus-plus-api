// importing the dependencies
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { resourceSchema, courseSchema, textbookSchema } = require("./schemas");

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("[@:remote-addr] => [:method :url] => [status: :status] => [in :total-time ms] "));

mongoose.connect(process.env.MONGO_DB_URL);
const Courses = mongoose.model("courses", courseSchema);
const Resources = mongoose.model("resources", resourceSchema);
const Textbooks = mongoose.model("textbooks", textbookSchema);

/****** API ROUTES  ******/
app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});
// return courses
app.get("/api/courses", (req, res) => {
	Courses.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
// return resources
app.get("/api/resources", (req, res) => {
	Resources.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
// return resources
app.get("/api/textbook", (req, res) => {
	Textbooks.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
/****** API ROUTES  ******/

// starting the server
app.listen(4000, () => {
	console.log(`listening at [ http://localhost:4000 ]`);
});
