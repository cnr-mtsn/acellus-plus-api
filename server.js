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

mongoose.connect(process.env.DB_URL);
const Courses = mongoose.model("courses", courseSchema);
const Resources = mongoose.model("resources", resourceSchema);
const Textbooks = mongoose.model("textbooks", textbookSchema);
const Feedback = mongoose.model("feedback", feedbackSchema);
const getAllRoutes = [
	{ path: "/api/courses", collection: Courses },
	{ path: "/api/resources", collection: Resources },
	{ path: "/api/textbook", collection: Textbooks },
	{ path: "/api/feedback", collection: Feedback },
];
const deleteAllRoutes = [
	{ path: "/api/delete/courses", collection: Courses },
	{ path: "/api/delete/resources", collection: Resources },
	{ path: "/api/delete/textbook", collection: Textbooks },
	{ path: "/api/delete/feedback", collection: Feedback },
];
const postNewRoutes = [{ path: "/api/postFeedback", collection: Feedback, item: "Feedback" }];
const images = [
	{ path: "/images/android-chrome-192x192.png", file: "./images/android-chrome-192x192.png" },
	{ path: "/images/android-chrome-512x512.png", file: "./images/android-chrome-512x512.png" },
	{ path: "/images/apple-touch-icon.png", file: "./images/apple-touch-icon.png" },
	{ path: "/images/favicon-16x16.png", file: "./images/favicon-16x16.png" },
	{ path: "/images/favicon-32x32.png", file: "./images/favicon-32x32.png" },
	{ path: "/favicon.ico", file: "./images/favicon.ico" },
	{ path: "/images/acellus-logo.png", file: "./images/acellus-logo.png" },
	{ path: "/images/blue-background.jpg", file: "./images/blue-background.jpg" },
];

/****** API ROUTES  ******/
app.get("/", (req, res) => {
	res.sendFile("/index.html", { root: __dirname });
});
// return courses
getAllRoutes.forEach(route => {
	app.get(route.path, (req, res) => {
		route.collection.find({}, (err, result) => {
			if (err) {
				console.log(err);
			} else res.send(result);
		});
	});
});
deleteAllRoutes.forEach(route => {
	app.get(route.path, (req, res) => {
		route.collection.deleteMany({}, (err, result) => {
			if (err) {
				console.log(err);
			} else res.send(result);
		});
	});
});
postNewRoutes.forEach(route => {
	app.post(route.path, (req, res) => {
		const newObj = new route.collection(req.body);
		newObj.save((err, result) => {
			if (err) {
				res.send({ message: `${route.item} could not be submitted - please try again later` });
			} else {
				res.send({ message: `${route.item} recieved! Thank you for helping us improve the platform.` });
			}
		});
	});
});
/*** IMAGES ***/
images.forEach(image => {
	app.get(image.path, (req, res) => {
		res.sendFile(image.file, { root: __dirname });
	});
});

// starting the server
app.listen(process.env.PORT || 4000, () => {
	console.log(`listening at [ http://localhost:4000 ]`);
});

module.exports = { getAllRoutes };
