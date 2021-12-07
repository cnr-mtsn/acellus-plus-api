// importing the dependencies
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { resourceSchema, courseSchema, textbookSchema, feedbackSchema } = require("./schemas");

const app = express();
app.use(cors());
app.use(helmet());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("[@:remote-addr] => [:method :url] => [status: :status] => [in :total-time ms] "));

mongoose.connect(
	process.env.MONGO_DB_URI ||
		"mongodb+srv://conner:qea7VEF7cve3fwq.gzk@acellus-plus-db-dev.z2tdi.mongodb.net/acellus-plus-db-dev?retryWrites=true&w=majority"
);
const Courses = mongoose.model("courses", courseSchema);
const Resources = mongoose.model("resources", resourceSchema);
const Textbooks = mongoose.model("textbooks", textbookSchema);
const Feedback = mongoose.model("feedback", feedbackSchema);

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
// return feedback messages
app.get("/api/feedback", (req, res) => {
	Feedback.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
app.post("/api/postFeedback", (req, res) => {
	console.log(req.body);
	const newFeedback = new Feedback(req.body);
	newFeedback.save((err, result) => {
		if (err) {
			res.send({ message: "Feedback could not be submitted - please try again later" });
		} else {
			res.send({ message: "Feedback Recieved! Thank you for helping us improve the platform." });
		}
	});
});
/****** API ROUTES  ******/

/*** IMAGES ***/
app.get("/images/android-chrome-192x192.png", (req, res) => {
	res.sendFile("./images/android-chrome-192x192.png", { root: __dirname });
});
app.get("/images/android-chrome-192x192.png", (req, res) => {
	res.sendFile("./images/android-chrome-192x192.png", { root: __dirname });
});
app.get("/images/apple-touch-icon.png", (req, res) => {
	res.sendFile("./images/apple-touch-icon.png", { root: __dirname });
});
app.get("/images/favicon-16x16.png", (req, res) => {
	res.sendFile("./images/favicon-16x16.png", { root: __dirname });
});
app.get("/images/favicon-32x32.png", (req, res) => {
	res.sendFile("./images/favicon-32x32.png", { root: __dirname });
});
app.get("/favicon.ico", (req, res) => {
	res.sendFile("./images/favicon.ico", { root: __dirname });
});
app.get("/images/acellus-logo.png", (req, res) => {
	res.sendFile("./images/acellus-logo.png", { root: __dirname });
});
app.get("/images/blue-background.jpg", (req, res) => {
	res.sendFile("./images/blue-background.jpg", { root: __dirname });
});

// starting the server
app.listen(process.env.PORT || 4000, () => {
	console.log(`listening at [ http://localhost:4000 ]`);
});
