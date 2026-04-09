import { useQuery } from "@tanstack/react-query";
import { type TExamPreparationCourseSchema } from "../../-type";

export const useGetExamCourse = ({ id, options }: { id: string | number; options?: any }) => {
  return useQuery({
    queryKey: ["exam-course", id],
    queryFn: async (): Promise<TExamPreparationCourseSchema> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: String(id),
        title: "Mock Exam Preparation Course",
        description: "This is a detailed description of the mock course.",
        price: "200",
        duration: "4 weeks",
      };
    },
    ...options,
  });
};
