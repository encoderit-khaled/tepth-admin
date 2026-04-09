import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TForm } from "@/types/form";
import { useGetExamCourse } from "../-api/queries/use-get-exam-course";
import Loading from "@/components/base/loading";

import { type TExamPreparationCourseSchema } from "../-type";

type TProps = { form_data: Pick<TForm, "type" | "id"> };

export default function CardExamPreparationCourse({ form_data }: TProps) {
  const { data: course, isLoading: isLoadingCourse } = useGetExamCourse({
    id: form_data.id ?? "",
    options: {
      enabled: !!form_data.id && form_data.type === "read",
    },
  }) as { data: TExamPreparationCourseSchema; isLoading: boolean };

  if (isLoadingCourse) {
    return <Loading />;
  }

  return (
    <Card className="w-full max-w-2xl border-none p-0 bg-transparent shadow-none px-4">
      <CardHeader className="p-0">
        <CardTitle>{course?.title}</CardTitle>
        {course?.duration && (
          <CardDescription>Duration: {course.duration}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6 p-0 mt-4">
        <div>
          <h4 className="font-medium mb-2 text-base">Course Information</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold">Title:</span> {course?.title}
            </li>
            <li>
              <span className="font-semibold">Price:</span> ${course?.price}
            </li>
            <li>
              <span className="font-semibold">Duration:</span> {course?.duration}
            </li>
            <li className="pt-2">
              <span className="font-semibold block mb-1">Description:</span>
              <p className="text-justify leading-relaxed">{course?.description}</p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
