import { Note } from "../helpers/models/TaskModel";

export const ReadAllNotes = async (): Promise<object> => {
  const notes = await Note.findAll();
  return notes;
};
