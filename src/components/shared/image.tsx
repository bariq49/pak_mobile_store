import Image, { StaticImageData } from "next/image";
import cn from "classnames";
import React from "react";

interface Props {
  variant?: string;
  rootClassName?: string;
  className?: string;
  width: string | number;
  height: string | number;
  src: string | StaticImageData;
  alt: string;
  loading?: "eager" | "lazy"; // Add loading prop
  priority?: boolean; // Make priority optional
}

const ImageFill: React.FC<Props> = ({
  className,
  rootClassName,
  variant,
  width,
  height,
  src,
  alt,
  loading = "eager", // Default to lazy for non-critical images
  priority = true,
}) => {
  // Automatically set priority for eager loading
  const effectivePriority = loading === "eager" ? true : priority;

  return (
    <div className={cn("relative md:inline-block ", rootClassName)}>
      <div className={cn("block w-full box-sizing")}>
        <svg
          className="block max-w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          version="1.1"
        />
      </div>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        loading={loading} // Use explicit loading prop
        priority={effectivePriority} // Use priority prop
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full w-auto h-auto object-cover",
          {
            " min-h-full": variant === "cover",
          },
          className
        )}
      />
    </div>
  );
};

export default ImageFill;
