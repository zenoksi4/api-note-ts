import express from 'express';
import notesRout from './routes/NotesRout'

const router = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
router.use(jsonBodyMiddleware);
router.use('/notes', notesRout)

router.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})