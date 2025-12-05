
"use client";

import cn from 'classnames';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import React from "react";

interface Props {
  className?: string;
}

const Loading: React.FC<Props> = ({
                                 className,
                                 ...props
                               }) => {
  const { selectedColor } = usePanel();
  
  return (
      <div className={cn("flex justify-center items-center min-h-[400px]",className)}>
        <div
            className={cn("animate-spin rounded-full h-12 w-12 border-4 border-t-transparent", colorMap[selectedColor].border)}></div>
      </div>
  );
};

export default Loading;
