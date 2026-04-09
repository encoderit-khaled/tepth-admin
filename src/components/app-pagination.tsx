
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TProps = {
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  currentPage: number;
  totalPages: number;
  onClickPage: (page: number) => void;
  onClickPrev: (page: number) => void;
  onClickNext: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export default function AppPagination({
  meta,
  currentPage,
  totalPages,
  onClickPage,
  onClickPrev,
  onClickNext,
}: TProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * meta.per_page + 1} to{" "}
        {Math.min(currentPage * meta.per_page, meta.total)} of {meta.total} entries
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onClickPrev(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onClickNext(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
