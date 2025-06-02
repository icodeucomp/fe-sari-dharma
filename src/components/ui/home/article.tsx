/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Container, Img, Motion, Tab } from "@/components";

import { convertDate } from "@/utils";

import { FaArrowRightLong } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LuTag } from "react-icons/lu";
import { getArtikelKesehatan } from "@/services/artikel-kesehatan.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk format URL gambar
const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

export const Article = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [mainArticle, setMainArticle] = React.useState<any>(null);
  const [sideArticles, setSideArticles] = React.useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("");

  // Fungsi untuk mengambil data artikel
  const fetchArtikel = React.useCallback(async (categoryId?: string) => {
    try {
      setLoading(true);
      const params: any = { per_page: 4, page: 1 };
      
      // Add category_id to params if provided
      if (categoryId) {
        params.kategori_id = categoryId;
      }
      
      const response = await getArtikelKesehatan(params);
      const articles = response.data.data;

      if (articles.length > 0) {
        setMainArticle(articles[0]);
        setSideArticles(articles.slice(1, 4));
      } else {
        setMainArticle(null);
        setSideArticles([]);
      }
    } catch (error) {
      console.error("Error fetching artikel:", error);
      setMainArticle(null);
      setSideArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle tab click
  const handleTabClick = React.useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    fetchArtikel(categoryId);
  }, [fetchArtikel]);

  // Initial fetch when component mounts
  React.useEffect(() => {
    if (selectedCategoryId) {
      fetchArtikel(selectedCategoryId);
    }
  }, [fetchArtikel, selectedCategoryId]);

  return (
    <Container className="py-16 space-y-8 lg:py-20">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Motion
            tag="h4"
            initialX={-50}
            animateX={0}
            duration={0.4}
            className="heading"
          >
            Artikel Kesehatan
          </Motion>
          <Motion
            tag="p"
            initialX={-50}
            animateX={0}
            duration={0.4}
            delay={0.3}
            className="subheading"
          >
            Temukan berbagai tips kesehatan dan informasi medis disini.
          </Motion>
        </div>
        <div className="flex gap-4">
          <Button className="btn-outline">Lihat Semua</Button>
        </div>
      </div>

      <Tab onTabClick={handleTabClick} selectedCategoryId={selectedCategoryId} />

      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading articles...</p>
        </div>
      ) : (
        <div className="flex justify-between gap-12">
          <div className="max-w-lg">
            {mainArticle ? (
              <Motion
                tag="div"
                initialY={30}
                animateY={0}
                duration={1}
                delay={0.5}
                className="space-y-4 min-h-400 text-dark bg-light"
              >
                <Img
                  src={getImageUrl(mainArticle.foto)}
                  alt={mainArticle.judul}
                  className="w-full rounded-lg h-60"
                  cover
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-8 py-2 rounded-md bg-secondary text-light">
                    <LuTag />
                    <p className="text-sm">{mainArticle.kategori.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline />
                    <p className="text-sm text-gray">
                      {convertDate(mainArticle.created_at)}
                    </p>
                  </div>
                </div>
                <h4 className="text-base font-bold sm:text-xl line-clamp-1">
                  {mainArticle.judul}
                </h4>
                <p className="text-sm text-justify line-clamp-5">
                  {mainArticle.konten.replace(/<[^>]+>/g, "").length > 300
                    ? `${mainArticle.konten.replace(/<[^>]+>/g, "").slice(0, 300)}...`
                    : mainArticle.konten.replace(/<[^>]+>/g, "")}
                </p>
                
                <Link
                  href={`/media-informasi/artikel-kesehatan/${mainArticle.slug}/${mainArticle.id}`}
                  className="flex max-w-[100px] items-center gap-2 btn-outline rounded-lg px-4 py-2 mt-0"
                >
                  Lihat
                  <FaArrowRightLong />
                </Link>
              </Motion>
            ) : (
              <div className="flex items-center justify-center h-60">
                <p>No articles found in this category</p>
              </div>
            )}
          </div>
          <div className="py-4 space-y-8">
            {sideArticles.length > 0 ? (
              sideArticles.map((article, index) => (
                <Motion
                  tag="div"
                  initialX={30}
                  animateX={0}
                  duration={index * 0.4}
                  delay={index * 0.2}
                  key={article.id}
                  className="flex items-center justify-between w-full gap-8"
                >
                  <div className="flex items-center gap-4">
                    <Img
                      src={getImageUrl(article.foto)}
                      alt={article.judul}
                      className="size-40 rounded-xl"
                      cover
                    />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 px-8 py-2 rounded-md w-max bg-secondary text-light">
                        <LuTag />
                        <p className="text-sm">{article.kategori.name}</p>
                      </div>
                      <h4 className="max-w-sm text-xl font-bold h-14">
                        {article.judul}
                      </h4>
                      <div className="flex items-center gap-2">
                        <IoCalendarOutline />
                        <p className="text-sm text-gray">
                          {convertDate(article.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/media-informasi/artikel-kesehatan/${article.slug}/${article.id}`}
                    className="flex items-center gap-2 btn-outline rounded-lg px-4 py-2"
                  >
                    Lihat
                    <FaArrowRightLong />
                  </Link>
                </Motion>
              ))
            ) : (
              !mainArticle && (
                <div className="flex items-center justify-center h-60">
                  <p>No additional articles in this category</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Container>
  );
};
