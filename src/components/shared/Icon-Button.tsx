import React from "react";
import cn from "classnames";
import { Tooltip } from "./tooltip";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "success" | "primary";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      tooltip,
      tooltipPosition = "top",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg border transition-colors disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-icon-button text-icon-button-foreground border-icon-button-border hover:bg-icon-button-hover",
      destructive:
        "bg-icon-button text-destructive border-icon-button-border hover:bg-destructive hover:text-destructive-foreground",
      success:
        "bg-icon-button text-success border-icon-button-border hover:bg-success hover:text-success-foreground",
      primary:
        "bg-icon-button text-primary border-icon-button-border hover:bg-primary hover:text-primary-foreground",
    };

    const sizes = {
      sm: "h-8 w-8 text-xs",
      md: "h-9 w-9 text-sm",
      lg: "h-10 w-10 text-base",
    };

    const buttonContent = (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip} position={tooltipPosition}>
          {buttonContent}
        </Tooltip>
      );
    }

    return buttonContent;
  }
);


IconButton.displayName = "IconButton";

export default IconButton;
