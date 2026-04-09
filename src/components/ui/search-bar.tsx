import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type TProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ searchValue, onSearchChange, placeholder = "Search..." }: TProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
}
