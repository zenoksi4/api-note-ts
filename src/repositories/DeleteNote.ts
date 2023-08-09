import { HTTP_STATUSES } from "../helpers/HttpStatuses";
import { Note } from "../helpers/models/TaskModel";

export const DeleteNote = async (id: string) => {
  const note = await Note.findByPk(id);

  if (note) {
    await note.destroy();

    return HTTP_STATUSES.NO_CONTENT_204;
  } else {
    return HTTP_STATUSES.NOT_FOUND_404;
  }
};
