import { Note } from "../helpers/models/TaskModel";

type UpdateNoteType = {
  title?: string;
  category?: string;
  content?: string;
};

export const UpdateNote = async (updateData: UpdateNoteType, id: string) => {
  const note = await Note.findByPk(id);

  if (note) {
    return await note.update(updateData);
  } else {
    return null;
  }
};
