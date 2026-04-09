import { useQuery } from "@tanstack/react-query";
import { type TExamPreparationCourseSchema } from "../../-type";

// Mock data generator
const generateMockCourses = (search?: string): TExamPreparationCourseSchema[] => {
  const allCourses: TExamPreparationCourseSchema[] = [
    {
      id: "1",
      title: "IELTS Intensive Preparation",
      description: "A comprehensive course for IELTS",
      price: "299",
      duration: "4 weeks",
    },
    {
      id: "2",
      title: "TOEFL Success Path",
      description: "Master TOEFL with our expert guides",
      price: "250",
      duration: "6 weeks",
    },
    {
      id: "3",
      title: "Pearson Test of English (PTE) Prep",
      description: "Academic preparation for PTE",
      price: "199",
      duration: "3 weeks",
    },
  ];

  if (search) {
    return allCourses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return allCourses;
};

export const useGetAllExamCourses = ({ params, options }: { params: any; options?: any }) => {
  return useQuery({
    queryKey: ["exam-courses", params],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = generateMockCourses(params.search);
      return {
        data,
        meta: {
          current_page: 1,
          last_page: 1,
          total: data.length,
          per_page: 10,
        },
      };
    },
    ...options,
  });
};
