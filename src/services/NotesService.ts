import { Request, Response } from 'express';
import { HTTP_STATUSES } from '../helpers/HttpStatuses';
import { CreateNoteModel } from '../helpers/models/CreateNoteModel';
import { StatsViewModel } from '../helpers/models/StatsViewModel';
import { NoteViewModel } from '../helpers/models/NoteViewModel';
import { UpdateNoteModel } from '../helpers/models/UpdateNoteModel';
import { URIParamsNoteIdModel } from '../helpers/models/URIParamsNoteIdModel';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../helpers/typesRequest';
import { db } from '../repositories/DBNotes';
import { DeleteNote } from '../repositories/DeleteNote';
import { UpdateNote } from '../repositories/UpdateNote';
import { AddNote } from '../repositories/AddNote';




const readAllNotes = (req: Request, res: Response<NoteViewModel[]>) => {
    res
        .status(HTTP_STATUSES.OK_200)
        .json(db.notes);
};


const readNotesStats = (req: Request, res: Response<StatsViewModel>) => {
    res
        .status(HTTP_STATUSES.OK_200)
        .json({summary: db.notes.length});
};

const readNote = (req: RequestWithParams<URIParamsNoteIdModel>, res: Response<NoteViewModel>) => {
    const foundNotes = db.notes.find(c => c.id === req.params.id)

    if (!foundNotes) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res
        .status(HTTP_STATUSES.OK_200)
        .json(foundNotes);
}

const createNote = (req: RequestWithBody<CreateNoteModel>, res: Response<NoteViewModel>) => {

    if(!req.body.title && !req.body.category && !req.body.content) {

        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }


    res
        .status(HTTP_STATUSES.CREATED_201)    
        .json(AddNote(req.body));

}

const deleteNote = (req: RequestWithParams<URIParamsNoteIdModel>, res: Response) => {
    DeleteNote(req.params.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}

const updateNote = (req: RequestWithParamsAndBody<URIParamsNoteIdModel,UpdateNoteModel>, res: Response<object>) => {

    if(!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    let updateNote = UpdateNote(req.body, req.params.id);
    let status = HTTP_STATUSES.ACCEPTED_202

    if(typeof updateNote === "number") {
        status = updateNote;
        updateNote = {}
    }

    res.status(status).json(updateNote);
}

export default { readAllNotes, readNotesStats, readNote, createNote, deleteNote, updateNote };