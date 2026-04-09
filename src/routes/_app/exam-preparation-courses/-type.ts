import { z } from "zod";

export const ExamPreparationCourseFormSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
});

export type TExamPreparationCourseFormSchema = z.infer<typeof ExamPreparationCourseFormSchema>;

export const ExamPreparationCourseSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  duration: z.string(),
});

export type TExamPreparationCourseSchema = z.infer<typeof ExamPreparationCourseSchema>;
