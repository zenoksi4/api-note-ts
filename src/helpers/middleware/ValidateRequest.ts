import { object, string, AnyObjectSchema, mixed } from "yup";
import { NextFunction, Request, Response } from "express";

export const ValidateYup = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.validate(req.body);

      console.log(data);

      res.locals.data = data;

      next();
    } catch (error) {
      console.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const SchemasCreate = {
  data: object().shape({
    title: string().required(),
    category: mixed().oneOf(["Task", "Idea", "Random Thought"]),
    content: string().required(),
  }),
};

export const SchemasUpdate = {
  data: object().shape({
    title: string().optional(),
    category: mixed().oneOf(["Task", "Idea", "Random Thought"]).optional(),
    content: string().optional(),
  }),
};

export const SchemasUpdateExtraFields = {
  data: SchemasUpdate.data.test(
    "extraFields",
    "Extra fields found",
    (value) => {
      const allowedFields = Object.keys(SchemasCreate.data.fields);
      const receivedFields = Object.keys(value);

      const extraFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
      );
      return extraFields.length === 0;
    }
  ),
};

export const SchemasCreateExtraFields = {
  data: SchemasCreate.data.test(
    "extraFields",
    "Extra fields found",
    (value) => {
      const allowedFields = Object.keys(SchemasCreate.data.fields);
      const receivedFields = Object.keys(value);

      const extraFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
      );
      return extraFields.length === 0;
    }
  ),
};
