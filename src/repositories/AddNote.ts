import { Note } from "../helpers/models/TaskModel";

type AddNoteType = {
  title: string;
  category: string;
  content: string;
};

export const AddNote = async (addNote: AddNoteType) => {
  const { title, category, content } = addNote;

  return await Note.create({
    title,
    category,
    content,
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  });
};
