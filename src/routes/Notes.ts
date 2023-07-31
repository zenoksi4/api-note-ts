import express from 'express';
import services from '../services/NotesService'


const router = express.Router();

router.get('/', services.readAllNotes);
router.get('/stats', services.readNotesStats);
router.get('/:id', services.readNote);
router.post('/', services.createNote);
router.delete('/:id', services.deleteNote);
router.patch('/:id', services.updateNote)

export = router;