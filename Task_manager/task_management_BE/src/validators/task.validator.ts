import * as yup from "yup";

const createTaskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  subtasks: yup.array().optional(),
  status: yup.string().oneOf(["todo", "in-progress", "done"]).default("todo"),
  isDeleted: yup.boolean().default(false),
});

export { createTaskSchema };
