import express from 'express';
import services from '../services/NotesService'
import { ValidateYup, SchemasCreate, SchemasUpdate } from '../helpers/middleware/ValidateRequest';


const router = express.Router();

router.get('/', services.readAllNotes);
router.get('/stats', services.readNotesStats);
router.get('/:id', services.readNote);
router.post('/', ValidateYup(SchemasCreate.data), services.createNote);
router.delete('/:id', services.deleteNote);
router.patch('/:id', ValidateYup(SchemasUpdate.data), services.updateNote)

export = router;