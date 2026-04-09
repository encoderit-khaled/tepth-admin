import { useMutation } from "@tanstack/react-query";
import { type TExamPreparationCourseFormSchema } from "../../-type";

export const useUpdateExamCourse = () => {
  return useMutation({
    mutationFn: async (data: TExamPreparationCourseFormSchema & { id: string | number }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Updating Exam Course:", data);
      return data;
    },
  });
};
