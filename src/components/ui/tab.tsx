"use client";

import * as React from "react";
import { Motion } from "@/components";
import { getMasterKategori } from "@/services/master-kategori.service";

interface TabProps {
  onTabChange?: (kategoriId: string) => void;
}

/**
 * Komponen Tab untuk menampilkan kategori artikel
 */
export const Tab: React.FC<TabProps> = ({ onTabChange }) => {
  const [categories, setCategories] = React.useState<Array<{ id: string; name: string }>>([]);
  const [activeTab, setActiveTab] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  // Fungsi untuk mengambil data kategori
  const fetchCategories = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMasterKategori();
      if (response.success && response.data.data.length > 0) {
        setCategories(response.data.data);
        // Set kategori pertama sebagai default aktif
        if (!activeTab) {
          setActiveTab(response.data.data[0].id);
          onTabChange?.(response.data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, onTabChange]);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
              setActiveTab(category.id);
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
