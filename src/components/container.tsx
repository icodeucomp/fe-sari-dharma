import { forwardRef } from "react";

import { ContainerProps } from "@/types";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={`relative max-w-container w-full mx-auto px-4 sm:px-8 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
});

Container.displayName = "Container";
