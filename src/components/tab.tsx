"use client";

import * as React from "react";
import { Button } from "./button";
import { getMasterKategori } from "@/services/master-kategori.service";

// Import the interface from the service file to maintain consistency
interface MasterKategori {
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
  const [categories, setCategories] = React.useState<MasterKategori[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getMasterKategori({
          flag: 'ArtikelKesehatan',
          per_page: 100
        });
        setCategories(response.data.data);
        setLoading(false);
        
        // If no category is selected yet and we have categories, select the first one
        if (!selectedCategoryId && response.data.data.length > 0 && onTabClick) {
          onTabClick(response.data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [onTabClick, selectedCategoryId]);

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
      <div ref={sliderRef} onMouseDown={handleMouseDown} className={`flex space-x-4 overflow-x-auto scrollbar-hide ${isScrollable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}>
        {loading ? (
          // Show loading state
          Array.from({ length: 3 }).map((_, index) => (
            <Button key={index} className="flex-shrink-0 w-40 btn-outline">
              Loading...
            </Button>
          ))
        ) : categories.length > 0 ? (
          // Map through actual categories
          categories.map((category) => (
            <Button 
              key={category.id} 
              className={`flex-shrink-0 w-auto ${selectedCategoryId === category.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => onTabClick && onTabClick(category.id)}
            >
              {category.name}
            </Button>
          ))
        ) : (
          // Fallback if no categories found
          <Button className="flex-shrink-0 w-40 btn-outline">No categories found</Button>
        )}
      </div>
    </div>
  );
};
