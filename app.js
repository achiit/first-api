import express from 'express';
import { getNotes, getNoteById, createNote } from './database.js';
const app = express();

app.use(express.json());

app.get('/notes', async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const note = await getNoteById(id);
  res.send(note);
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  const note = await createNote(title, content);
  res.status(201).send(note);
});

app.get('/', (req, res) => {
  res.send("Welcome to my page!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;
app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
