// After App Use Statements, per Vince add: app.use(express.static("public"))

var express = require("express");
var app = express();
let db = require("./db/db.json");
let uuid = require("uuid");
var fs = require("fs");
var path = require("path");
const { notDeepEqual } = require("assert");

// Initial Port
const PORT = process.env.PORT || 4100;

// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Per Vince
app.use(express.static("public"));

// Routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    res.json(db);
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Post
app.post("/api/notes", function (req, res) {
    let note = req.body;
    note.id = uuid.v1();
    db.push(note);
    writeToDB(db);
    return res.json(db);
});

// Delete
app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == id) {
            db.splice(i, 1);
            writeToDB(db);
            res.json(db);
            break;
        }
    }
});

// Copy + Paste below from activities
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
function writeToDB(array) {
    fs.writeFileSync("./db/db.json", JSON.stringify(arrauy));
}


