import { db, NoteType } from "./DBNotes";

type AddNoteType = {
    title: string,
    category: string,
    content: string,
}



export const AddNote = (addNote : AddNoteType) => {
    const newNote: NoteType = {
        id: Math.random().toString(),
        title: addNote.title,
        created: new Date().toLocaleDateString('uk'),
        category: addNote.category,
        content: addNote.content,
    }

    db.notes.push(newNote);
    return newNote;
}