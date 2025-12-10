import { Minus, Plus } from "lucide-react";
import { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  onClear?: () => void; // 👈 optional clear handler
}

export function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
  onClear,
}: FilterSectionProps) {
  return (
    <div className="relative flex flex-col pb-8 lg:pb-10 space-y-5">
      <div className="block-title flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onToggle}
        >
          <h3 className="font-medium text-base lg:text-[17px] text-brand-dark">
            {title}
          </h3>
          <button
            className="h-4 w-4 flex items-center justify-center"
            aria-label={
              isOpen
                ? `Collapse ${title.toLowerCase()}`
                : `Expand ${title.toLowerCase()}`
            }
          >
            {isOpen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && <div className="space-y-4">{children}</div>}
    </div>
  );
}
