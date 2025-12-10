"use client";

import cn from "classnames";
import { usePanel } from "@/hooks/use-panel";
import React from "react";

interface Props {
  className?: string;
}

const Loading: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center min-h-[200px]",
        className
      )}
    >
      <div
        className={cn(
          "animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-primary-500"
        )}
      ></div>
    </div>
  );
};

export default Loading;
