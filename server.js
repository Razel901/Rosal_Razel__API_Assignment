const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize with some data
let students = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 22 },
  { id: 3, name: "Charlie", age: 19 }
];

// Create (POST)
app.post("/students", (req, res) => {
  const student = req.body;
  students.push(student);
  res.status(201).json({ message: "Student added", student });
});

// Read (GET)
app.get("/students", (req, res) => {
  res.json(students);
});

// Update (PUT)
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  students = students.map((student) =>
    student.id == id ? { ...student, ...updatedData } : student
  );
  res.json({ message: "Student updated", students });
});

// Delete (DELETE)
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter((student) => student.id != id);
  res.json({ message: "Student deleted", students });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
