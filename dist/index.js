"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    notes: [
        { id: '1', title: 'note1', created: new Date().toLocaleDateString('uk'), category: 'Task', content: 'notes1' },
        { id: '2', title: 'note2', created: new Date().toLocaleDateString('uk'), category: 'Idea', content: 'notes2' },
        { id: '3', title: 'note3', created: new Date().toLocaleDateString('uk'), category: 'Task', content: 'notes3' },
    ],
};
app.get('/notes', (req, res) => {
    res.json(db.notes);
});
app.get('/notes/stats', (req, res) => {
    res.json({
        summary: db.notes.length
    });
});
app.get('/notes/:id', (req, res) => {
    const foundNotes = db.notes.find(c => c.id === req.params.id);
    if (!foundNotes) {
        res.sendStatus(404);
        return;
    }
    res.json(foundNotes);
});
app.post('/notes', (req, res) => {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(400);
        return;
    }
    const newNote = {
        id: Math.random().toString(),
        title: req.body.title,
        created: new Date().toLocaleDateString('uk'),
        category: req.body.category,
        content: req.body.content,
    };
    db.notes.push(newNote);
    res
        .status(201)
        .json(newNote);
});
app.delete('/notes/:id', (req, res) => {
    db.notes = db.notes.filter(c => c.id !== req.params.id);
    res.sendStatus(204);
});
app.patch('/notes/:id', (req, res) => {
    if (!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(400);
        return;
    }
    const foundNotes = db.notes.find(c => c.id === req.params.id);
    if (!foundNotes) {
        res.sendStatus(404);
        return;
    }
    if (req.body.title) {
        foundNotes.title = req.body.title;
    }
    if (req.body.category) {
        foundNotes.category = req.body.category;
    }
    if (req.body.content) {
        foundNotes.content = req.body.content;
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
