import { Request, Response } from "express";
import { HTTP_STATUSES } from "../helpers/HttpStatuses";
import { DeleteNote } from "../repositories/DeleteNote";
import { UpdateNote } from "../repositories/UpdateNote";
import { AddNote } from "../repositories/AddNote";
import { ReadAllNotes } from "../repositories/ReadAllNotes";
import { ReadNote } from "../repositories/ReadNote";
import { Note } from "../helpers/models/TaskModel";
import { ReadNoteStats } from "../repositories/readNotesStats";

export type URIParamsNoteIdModel = {
  id: string;
};

const readAllNotes = async (req: Request, res: Response) => {
  const notes = await ReadAllNotes();
  res.status(HTTP_STATUSES.OK_200).json(notes);
};

const readNotesStats = async (req: Request, res: Response) => {
  const stats = await ReadNoteStats();
  res.status(HTTP_STATUSES.OK_200).json({ summary: stats });
};

const readNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const foundNotes = await ReadNote(id);

  if (!foundNotes) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.status(HTTP_STATUSES.OK_200).json(foundNotes);
};

const createNote = async (req: Request, res: Response) => {
  if (!req.body.title && !req.body.category && !req.body.content) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const createdNote = await AddNote(req.body);

  res.status(HTTP_STATUSES.CREATED_201).json(createdNote);
};

const deleteNote = async (req: Request, res: Response) => {
  const status = await DeleteNote(req.params.id);

  res.sendStatus(status);
};

const updateNote = async (req: Request, res: Response<object>) => {
  try {
    const noteId = req.params.id;
    const { title, category, content } = req.body;
    let status = HTTP_STATUSES.ACCEPTED_202;

    const updatedData: Partial<Note> = {};
    if (title !== undefined) updatedData["title"] = title;
    if (category !== undefined) updatedData["category"] = category;
    if (content !== undefined) updatedData["content"] = content;

    if (!title && !category && !content) {
      status = HTTP_STATUSES.BAD_REQUEST_400;
      res.sendStatus(status).json({ message: "No data to update" });
      return;
    }

    let updateNote = await UpdateNote(updatedData, noteId);
    if (!updateNote) {
      status = HTTP_STATUSES.NOT_FOUND_404;
    }

    res.status(status).json(updateNote || { message: "NOT FOUND" });
  } catch (error) {
    res.json(error);
  }
};

export default {
  readAllNotes,
  readNotesStats,
  readNote,
  createNote,
  deleteNote,
  updateNote,
};
