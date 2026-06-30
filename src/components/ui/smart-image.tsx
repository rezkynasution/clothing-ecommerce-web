"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "onError" | "onLoad"> & {
  wrapperClassName?: string;
};

/**
 * next/image wrapper that degrades gracefully: while loading it shows a soft
 * shimmer, and if the remote source fails it falls back to an elegant gradient
 * placeholder instead of a broken-image icon — keeping the layout premium.
 */
export function SmartImage({ className, alt, ...props }: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  return (
    <>
      {status !== "loaded" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 mesh-bg bg-foreground/5",
            status === "loading" && "animate-pulse"
          )}
        />
      )}
      {status !== "error" && (
        <Image
          {...props}
          alt={alt}
          className={cn(
            className,
            "transition-opacity duration-700",
            status === "loaded" ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </>
  );
}
