"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Motion } from "@/components";
import { getMasterCategory } from "@/services/category.service";

interface TabProps {
  onTabChange?: (categoryId: string) => void;
}

export const Tab: React.FC<TabProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("");

  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => getMasterCategory(),
    select: (response) => response.data.data as Array<{ id: string; name: string }>,
  });

  const activeTab = selectedTab || categories[0]?.id || "";

  React.useEffect(() => {
    if (categories.length > 0) onTabChange?.(categories[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <p>Memuat kategori...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category, index) => (
        <Motion tag="div" key={category.id} initialY={20} animateY={0} duration={0.3} delay={index * 0.1}>
          <button
            onClick={() => {
              setSelectedTab(category.id);
              onTabChange?.(category.id);
            }}
            className={`px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${activeTab === category.id ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {category.name}
          </button>
        </Motion>
      ))}
    </div>
  );
};
