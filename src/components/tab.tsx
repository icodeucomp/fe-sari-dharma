"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./button";
import { getMasterCategory } from "@/services/category.service";

interface MasterCategory {
  id: string;
  name: string;
  page: string;
  flag: string;
  created_at: string;
  updated_at: string;
}

interface TabProps {
  onTabClick?: (categoryId: string) => void;
  selectedCategoryId?: string;
}

export const Tab: React.FC<TabProps> = ({ onTabClick, selectedCategoryId }) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState<boolean>(false);

  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ["categories", "HealthArticle"],
    queryFn: () => getMasterCategory({ flag: "HealthArticle", per_page: 100 }),
    select: (response) => response.data.data as MasterCategory[],
  });

  React.useEffect(() => {
    if (!selectedCategoryId && categories.length > 0 && onTabClick) {
      onTabClick(categories[0].id);
    }
  }, [categories, onTabClick, selectedCategoryId]);

  React.useEffect(() => {
    if (sliderRef.current) {
      setIsScrollable(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
    }
  }, [categories]);

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
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className={`flex space-x-4 overflow-x-auto scrollbar-hide ${isScrollable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
      >
        {loading ? (
          <Button className="shrink-0 w-40 btn-outline">Memuat...</Button>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <Button
              key={category.id}
              className={`shrink-0 w-auto ${selectedCategoryId === category.id ? "btn-primary" : "btn-outline"}`}
              onClick={() => onTabClick && onTabClick(category.id)}
            >
              {category.name}
            </Button>
          ))
        ) : (
          <p className="py-2 text-sm italic text-gray">Belum ada kategori.</p>
        )}
      </div>
    </div>
  );
};
