import { Request, Response } from 'express';
import { HTTP_STATUSES } from '../helpers/HttpStatuses';
import { CreateNoteModel } from '../helpers/models/CreateNoteModel';
import { NoteViewModel } from '../helpers/models/NoteViewModel';
import { UpdateNoteModel } from '../helpers/models/UpdateNoteModel';
import { URIParamsNoteIdModel } from '../helpers/models/URIParamsNoteIdModel';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../helpers/types';
import { db, NoteType } from '../repositories/DBNotes';





const readAllNotes = (req: Request, res: Response<NoteViewModel[]>) => {
    res.json(db.notes);
};


const readNotesStats = (req: Request, res: Response<NoteViewModel[]>) => {
    res.json(db.notes);
};

const readNote = (req: RequestWithParams<URIParamsNoteIdModel>, res: Response<NoteViewModel>) => {
    const foundNotes = db.notes.find(c => c.id === req.params.id)

    if (!foundNotes) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundNotes);
}

const createNote = (req: RequestWithBody<CreateNoteModel>, res: Response<NoteViewModel>) => {

    if(!req.body.title && !req.body.category && !req.body.content) {

        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if(!(typeof(req.body.title) == 'string')) {

        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const newNote: NoteType = {
        id: Math.random().toString(),
        title: req.body.title,
        created: new Date().toLocaleDateString('uk'),
        category: req.body.category,
        content: req.body.content,
    }

    db.notes.push(newNote);
    res
        .status(HTTP_STATUSES.CREATED_201)    
        .json(newNote);

}

const deleteNote = (req: RequestWithParams<URIParamsNoteIdModel>, res: Response) => {
    db.notes = db.notes.filter(c => c.id !== req.params.id)

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}

const updateNote = (req: RequestWithParamsAndBody<URIParamsNoteIdModel,UpdateNoteModel>, res: Response<NoteViewModel>) => {

    if(!req.body.title && !req.body.category && !req.body.content) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const foundNotes = db.notes.find(c => c.id === req.params.id)
    if (!foundNotes) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    if(req.body.title){
        foundNotes.title = req.body.title;
    }

    if(req.body.category){
        foundNotes.category = req.body.category;
    }

    if(req.body.content){
        foundNotes.content = req.body.content;
    }

    res.sendStatus(HTTP_STATUSES.CREATED_201)
        .json(foundNotes);
}

export default { readAllNotes, readNotesStats, readNote, createNote, deleteNote, updateNote };