import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

type TAction = {
  type: string;
  name: string;
  icon: LucideIcon | React.ComponentType;
  props: {
    onClick: () => void;
    className?: string;
  };
};

type TProps = {
  actions: TAction[];
  variant?: "dropdown" | "inline";
};

export default function AppActionsDropdown({ actions, variant = "dropdown" }: TProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.props.onClick}
              className={`hover:opacity-70 transition-opacity ${action.props.className ?? ""}`}
              title={action.name}
            >
              <Icon className="h-4.5 w-4.5" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={action.props.onClick}
              className={action.props.className}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="capitalize">{action.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
