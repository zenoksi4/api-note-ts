import express from 'express';
import services from '../services/NotesService'
import { ValidateYup, SchemasCreate, SchemasUpdate, SchemasUpdateExtraFields, SchemasCreateExtraFields} from '../helpers/middleware/ValidateRequest';

const router = express.Router();

router.get('/', services.readAllNotes);
router.get('/stats', services.readNotesStats);
router.get('/:id', services.readNote);
router.post('/', ValidateYup(SchemasCreate.data),ValidateYup(SchemasCreateExtraFields.data), services.createNote);
router.delete('/:id', services.deleteNote);
router.patch('/:id', ValidateYup(SchemasUpdate.data),ValidateYup(SchemasUpdateExtraFields.data), services.updateNote)

export = router;