import { Spinner } from "../ui/spinner";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center w-full h-full min-h-[50vh]">
      <Spinner
        key={"bars"}
        variant="bars"
        className="text-custom-modal-pink-text"
      />
    </div>
  );
}
