import express from 'express';
import notesRoutes from './routes/Notes'

const router = express();
const port = process.env.PORT || 5000;

const jsonBodyMiddleware = express.json();
router.use(jsonBodyMiddleware);
router.use('/notes', notesRoutes)

router.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})