import { Note } from "../helpers/models/TaskModel";

export const ReadNote = async (id: String) => {
  const note = await Note.findOne({
    where: {
      id,
    },
  });
  return note;
};
