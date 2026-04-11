const express = require('express');
const app = express();

app.use(express.json());

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

app.post("/notes",(req,res)=>{
    const {subject,level}=req.body;
    if(!subject||!level){
        return res.status(404).json({message:"Subject and level are required"});
    }
    const newNote={
        id:notes.length+1,
        subject,
        level
    }
    notes.push(newNote);
    res.status(200).json({
        message:"Node added successfully",
        note:newNote
    });
});

app.put("/notes/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const {subject,level}=req.body;
    const findNotes=notes.find(n=>n.id===id)
    if(!findNotes){
        return res.status(404).json({message:"Notes not found"});
    }
    if(subject){
        findNotes.subject=subject;
    }
    if(level){
        findNotes.level=level;
    }
    res.status(200).json({
        message:"Note updated successfully",
        note:findNotes
    });
});

app.delete("/notes/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const findIndex=notes.findIndex(n=>n.id===id)
    if(findIndex==-1){
        return res.status(404).json({message:"Index not found"});
    }

    console.log("Before delete:", notes);


    notes.splice(findIndex, 1);
    res.status(200).json({
        message:"Note deleted successfully"
    });

    console.log("Before delete:", notes);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
