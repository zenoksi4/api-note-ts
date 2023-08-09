import express from "express";
import notesRout from "./routes/NotesRout";
import { Database } from "./helpers/models/index";

const router = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
router.use(jsonBodyMiddleware);
const db = new Database();

router.use("/notes", notesRout);

db.connect()
  .then(() => {
    db.addModels();
  })
  .then(() => {
    router.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
