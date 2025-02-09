"use client";

import * as React from "react";
import { Button } from "./button";

export const Tab: React.FC = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (sliderRef.current) {
      setIsScrollable(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="w-full mx-auto overflow-hidden">
      <div ref={sliderRef} onMouseDown={handleMouseDown} className={`flex space-x-4 overflow-x-auto scrollbar-hide ${isScrollable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Button key={index} className="flex-shrink-0 w-40 btn-outline">
            Tab {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
