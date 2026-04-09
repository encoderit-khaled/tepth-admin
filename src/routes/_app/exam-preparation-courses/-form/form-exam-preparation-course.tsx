import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  ExamPreparationCourseFormSchema,
  type TExamPreparationCourseFormSchema,
  type TExamPreparationCourseSchema,
} from "../-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCreateExamCourse } from "../-api/mutations/use-create-exam-course";
import { useUpdateExamCourse } from "../-api/mutations/use-update-exam-course";
import type { TForm } from "@/types/form";
import { useGetExamCourse } from "../-api/queries/use-get-exam-course";
import { Textarea } from "@/components/ui/textarea";

type TProps = {
  form_data: Pick<TForm, "type" | "id">;
  onSuccess: () => void;
};

export default function FormExamPreparationCourse({ form_data, onSuccess }: TProps) {
  const form = useForm<TExamPreparationCourseFormSchema>({
    resolver: zodResolver(ExamPreparationCourseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      duration: "",
    },
  });

  const { reset, control, handleSubmit } = form;

  const { data: courseData, isLoading } = useGetExamCourse({
    id: form_data.id ?? "",
    options: { enabled: !!form_data.id && form_data.type === "update" },
  }) as { data: TExamPreparationCourseSchema; isLoading: boolean };

  const { mutate: createCourse, isPending: creating } = useCreateExamCourse();
  const { mutate: updateCourse, isPending: updating } = useUpdateExamCourse();

  /* Load data for update */
  useEffect(() => {
    if (form_data.type === "update" && courseData && !isLoading) {
      reset({
        title: courseData.title || "",
        description: courseData.description || "",
        price: courseData.price || "",
        duration: courseData.duration || "",
      });
    }
  }, [form_data, courseData, isLoading, reset]);

  const onSubmit = (data: TExamPreparationCourseFormSchema) => {
    if (form_data.type === "update") {
      updateCourse(
        { ...data, id: form_data.id! },
        {
          onSuccess: () => {
            reset();
            onSuccess();
          }
        }
      );
    } else {
      createCourse(data, {
        onSuccess: () => {
          reset();
          onSuccess();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter course description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 4 weeks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onSuccess();
            }}
            className="capitalize min-w-24"
          >
            cancel
          </Button>

          <Button
            type="submit"
            variant="active"
            className="min-w-24"
            loading={creating || updating}
            disabled={creating || updating}
          >
            {form_data.type === "update" ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
