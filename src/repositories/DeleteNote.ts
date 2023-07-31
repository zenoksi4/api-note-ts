import { db } from "./DBNotes";


export const DeleteNote = (id:string)=> {
    db.notes = db.notes.filter(c => c.id !== id)
}