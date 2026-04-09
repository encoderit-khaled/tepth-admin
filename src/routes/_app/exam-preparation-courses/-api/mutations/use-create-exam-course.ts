import { useMutation } from "@tanstack/react-query";
import { type TExamPreparationCourseFormSchema } from "../../-type";

export const useCreateExamCourse = () => {
  return useMutation({
    mutationFn: async (data: TExamPreparationCourseFormSchema) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Creating Exam Course:", data);
      return { id: Math.random().toString(), ...data };
    },
  });
};
