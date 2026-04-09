import { useMutation } from "@tanstack/react-query";

export const useDeleteExamCourse = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string | number }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Deleting Exam Course with ID:", id);
      return { id };
    },
  });
};
