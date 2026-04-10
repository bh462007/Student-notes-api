const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send('Hello ji Namaste, I build this');
});

const notes = [
    { id: 1, subject: "js", level: "basic" },
    { id: 2, subject: "java", level: "intermediate" },
    { id: 3, subject: "php", level: "advance" },
    { id: 4, subject: "dsa", level: "basic" }
];

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.get("/notes/:id", (req, res) => {
    const id=parseInt(req.params.id);
    const findNotes = notes.find(n => n.id === id);
    if (!findNotes) {
        return res.status(404).json({ message: "Notes not found" });
    }
    res.json(findNotes);
});

app.get("/search",(req,res)=>{
    const {subject}=req.query;
    if(!subject){
        return res.status(404).json({message:"Please provide a subject"});
    }
    const searchNotes=notes.filter(n=>
        n.subject.toLowerCase().includes(subject.toLowerCase())
    );
    res.json(searchNotes);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
