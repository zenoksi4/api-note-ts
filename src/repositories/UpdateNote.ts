import { HTTP_STATUSES } from "../helpers/HttpStatuses";
import { db } from "./DBNotes";

type UpdateNoteType = {
    title?: string,
    category?: string,
    content?: string,
}



export const UpdateNote = (updateData : UpdateNoteType, id:string):object | number => {
    const foundNotes = db.notes.find(c => c.id === id)
    if (!foundNotes) {
        return HTTP_STATUSES.NOT_FOUND_404;

    }

    if(updateData.title){
        foundNotes.title = updateData.title;
    }

    if(updateData.category){
        foundNotes.category = updateData.category;
    }

    if(updateData.content){
        foundNotes.content = updateData.content;
    }

    return foundNotes;
    
}