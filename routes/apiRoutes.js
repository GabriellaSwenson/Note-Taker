const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error reading database" });
      }
      let notes = JSON.parse(data);
      res.json(notes);
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error reading database" });
      }
      let notes = JSON.parse(data);
      const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error writing to database" });
        }
        res.json(newNote);
      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error reading database" });
      }
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== id);
      fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error writing to database" });
        }
        res.json({ message: "Note deleted" });
      });
    });
  });
};
