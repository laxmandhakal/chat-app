import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import Messages from "./dbMessages.js";
import User from "./users.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Pusher for Real-time Database functionality
const pusher = new Pusher({
    appId: "1100629",
    key: "4e90b9fd9f34c089c6d9",
    secret: "dea2194313f2243e192a",
    cluster: "us2",
    useTLS: true,
});

// Set up app to use session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Set up app to use passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize user
// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser((id, done) => {
// 	User.findById(id, (err, user) => {
// 		done(err, user);
// 	});
// });

// Database connection
const db = mongoose.connection;

const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

db.once("open", () => {
    console.log("DB Connection Established!");
    const messageCollection = db.collection("messages");
    const changeStream = messageCollection.watch();

    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering pusher");
        }
    });
});

// Routes
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

// Get all messages
app.get("/messages", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Create new message
app.post("/messages/add", (req, res) => {
    const message = req.body;

    Messages.create(message, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// User routes - Return all users
app.get("/users", (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});
// find user login credential
app.post("/user/login", (req, res) => {
    const { username, password } = req.body;
    const email = req.body.username;

    // Check if user already exists && if not add to DB
    User.findOne({
            $or: [
                { username, password },
                { email, password },
            ],
        },
        (err, user) => {
            if (user) {
                console.log(user);
                res.status(200).send(user);
            }
            if (!user) {
                res.status(404).send("Wrong credentials");
            }
            if (err) {
                res.status(503).send(err);
            }
        }
    );
});

// Register new user
app.post("/users/register", (req, res) => {
    const { email, username, password } = req.body;

    // Check if user already exists && if not add to DB
    User.findOne({ email }, (err, user) => {
        if (user) {
            res.status(400).send("User Already Exists!");
        } else {
            const newUser = new User({
                email,
                username,
                password,
            });

            newUser.save();
            res.status(201).send(newUser);
        }
    });
});

// Listener
app.listen(PORT, () => console.log(`Server Listening on 127.0.0.1:${PORT}`));