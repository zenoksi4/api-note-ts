import { Note } from "../helpers/models/TaskModel";

export const ReadNoteStats = async () => {
  const columnsCount = await Note.count();

  return columnsCount;
};
