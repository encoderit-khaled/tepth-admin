import type { TForm } from "@/types/form";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Trash2, Pencil } from "lucide-react";
import AppActionsDropdown from "@/components/ui/app-actions-dropdown";
import SearchBar from "@/components/ui/search-bar";
import AppTable from "@/components/app-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FORM_DATA } from "@/data/form";
import FormExamPreparationCourse from "./-form/form-exam-preparation-course";
import CardExamPreparationCourse from "./-components/card-exam-preparation-course";
import type { TExamPreparationCourseSchema } from "./-type";
import { useGetAllExamCourses } from "./-api/queries/use-get-all-exam-courses";
import { useDeleteExamCourse } from "./-api/mutations/use-delete-exam-course";
import Loading from "@/components/base/loading";
import { useDebounce } from "@/hooks/search-hooks";
import { SearchSchema } from "@/types/search";

export const Route = createFileRoute("/_app/exam-preparation-courses/")({
  component: RouteComponent,
  validateSearch: SearchSchema,
});

function RouteComponent() {
  const [form, setForm] = useState<TForm>(FORM_DATA);
  const navigate = Route.useNavigate();
  const params = Route.useSearch();

  // Search state with debouncing
  const [search, setSearch] = useState(params.search || "");
  const debouncedSearch = useDebounce(search, 500); // 500ms delay

  // Sync debounced search with URL
  useEffect(() => {
    if (debouncedSearch !== params.search) {
      navigate({
        search: (prev) => ({
          ...prev,
          search: debouncedSearch,
          page: 1, // Reset to first page on search
        }),
        replace: true,
      });
    }
  }, [debouncedSearch, navigate, params.search]);

  const { data: coursesData, isPending: isLoading, refetch } = useGetAllExamCourses({
    params: params,
    options: { enabled: true }
  });

  const { data } = (coursesData as { data: TExamPreparationCourseSchema[] }) || { data: [] };

  const { mutate: deleteCourse, isPending: isPendingDeleting } = useDeleteExamCourse();

  const columns: ColumnDef<TExamPreparationCourseSchema>[] = [
    {
      id: "sl",
      header: "SL",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.index + 1}
        </div>
      ),
      size: 60,
    },
    {
      accessorKey: "title",
      header: "Course Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <div>{row.getValue("duration")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>${row.getValue("price")}</div>,
    },
    {
      header: () => <div className="text-center">Actions</div>,
      accessorKey: "action",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center">
            <AppActionsDropdown
              variant="inline"
              actions={[
                {
                  type: "read",
                  name: "view",
                  icon: Eye,
                  props: {
                    onClick: () =>
                      setForm({
                        type: "read",
                        title: "View Exam Course",
                        description: "",
                        id: String(item.id),
                      }),
                  },
                },
                {
                  type: "update",
                  name: "edit",
                  icon: Pencil,
                  props: {
                    onClick: () =>
                      setForm({
                        type: "update",
                        title: "Update Exam Course",
                        description: "",
                        id: String(item.id),
                      }),
                  },
                },
                {
                  type: "delete",
                  name: "delete",
                  icon: Trash2,
                  props: {
                    className: "text-red-500",
                    onClick: () =>
                      setForm({
                        type: "delete",
                        title: "",
                        description: "",
                        id: String(item.id),
                      }),
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center h-full w-full">
      <Loading />
    </div>
  );

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between mt-3 mb-5">
          <h1 className="text-custom-text-header text-2xl font-semibold">
            Exam Preparation Courses
          </h1>
          <Button
            variant="outline"
            className="border-custom-footer-text-red text-custom-footer-text-red hover:bg-red-50"
            onClick={() =>
              setForm({
                type: "create",
                title: "Add Exam Course",
                description: "Fill in the details below to create a new course.",
              })
            }
          >
            <Plus /> Add Exam Course
          </Button>
        </div>

        <div className="mb-4">
          <SearchBar searchValue={search} onSearchChange={setSearch} placeholder="Search courses..." />
        </div>
      </div>

      {/* TABLE */}
      <AppTable data={data ?? []} columns={columns} />

      {/* Read Dialog */}
      <Dialog open={form.type === "read"} onOpenChange={() => setForm(FORM_DATA)}>
        <DialogContent className="w-full max-w-lg p-0 pb-5">
          <DialogHeader className="p-4 rounded-t-lg">
            <DialogTitle>{form.title}</DialogTitle>
            <DialogDescription>{form.description}</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            {form.id ? (
              <CardExamPreparationCourse form_data={{ type: "read", id: form.id.toString() }} />
            ) : (
              <p className="text-muted-foreground">Course not found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Update Dialog */}
      <Dialog
        open={form.type === "create" || form.type === "update"}
        onOpenChange={() => setForm(FORM_DATA)}
      >
        <DialogContent className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-4 rounded-t-lg">
            <DialogTitle>{form.title}</DialogTitle>
            <DialogDescription>{form.description}</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <FormExamPreparationCourse
              form_data={form}
              onSuccess={() => {
                setForm(FORM_DATA);
                refetch();
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={form.type === "delete"} onOpenChange={() => setForm(FORM_DATA)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel className="capitalize min-w-24">Cancel</AlertDialogCancel>

            <Button
              variant="destructive"
              className="capitalize min-w-24 flex items-center gap-2"
              loading={isPendingDeleting}
              onClick={() =>
                deleteCourse(
                  { id: form.id! },
                  {
                    onSuccess: () => {
                      setForm(FORM_DATA);
                      refetch();
                    },
                  }
                )
              }
            >
              <Trash2 /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
