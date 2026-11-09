"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Background, Container, EmptyState, LoadingState, Motion } from "@/components";
import { LuTag, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { convertDate } from "@/utils";
import { getHealthArticle } from "@/services/health-article.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({ article }: { article: any }) => {
  return (
    <Background
      src={getImageUrl(article.photo)}
      alt={article.title}
      className="w-full min-h-60 flex items-end"
      imgClassName="object-cover"
      parentClassName="rounded-md"
    >
      <div className="absolute inset-0 bg-linear-to-b from-light/10 to-dark/40 w-full h-full" />
      <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
        <LuTag size={20} />
        {article.category?.name}
      </span>

      <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
        <span className="text-xs font-light">{convertDate(article.created_at)}</span>
        <Link href={`/media-information/health-articles/${article.slug}/${article.id}`}>
          <h3 className="font-semibold line-clamp-2">{article.title}</h3>
        </Link>
      </div>
    </Background>
  );
};

export const HealthArticle = () => {
  const { data: articles = [], isLoading: loading } = useQuery({
    queryKey: ["health-articles", "slider"],
    queryFn: () => getHealthArticle({ per_page: 5, page: 1 }),
    select: (response) => response.data.data as any[],
  });
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const mainArticle = articles.length > 0 ? articles[0] : null;
  const sideArticles = articles.slice(1);
  const currentArticle = articles[currentIndex];

  return (
    <Container className="space-y-8">
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialY={-50} animateY={0} duration={0.3} className="heading">
          Artikel Kesehatan
        </Motion>
        <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Temukan berbagai tips kesehatan dan informasi medis disini.
        </Motion>
      </div>

      <div className="pb-25">
        {loading ? (
          <LoadingState />
        ) : articles.length === 0 ? (
          <EmptyState title="Belum ada artikel" description="Artikel kesehatan akan segera dipublikasikan. Silakan kembali lagi nanti." />
        ) : (
          <>
            <div className="block lg:hidden relative">
              <Background
                src={getImageUrl(currentArticle.photo)}
                alt={currentArticle.title}
                className="w-full min-h-60 flex items-end h-100"
                imgClassName="object-cover"
                parentClassName="rounded-md"
              >
                <div className="absolute inset-0 bg-linear-to-b from-light/10 to-dark/40 w-full h-full" />
                <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
                  <LuTag size={20} />
                  {currentArticle.category?.name || "Edukasi Kesehatan"}
                </span>

                <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
                  <span className="font-light text-sm">{convertDate(currentArticle.created_at)}</span>
                  <Link href={`/media-information/health-articles/${currentArticle.slug}/${currentArticle.id}`}>
                    <h3 className="font-semibold text-xl line-clamp-2">{currentArticle.title}</h3>
                  </Link>
                </div>
              </Background>

              <button
                onClick={handlePrevSlide}
                className="z-5 absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                <LuChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextSlide}
                className="z-5 absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                <LuChevronRight size={24} />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {articles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray/30"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-4">
              <Background
                src={getImageUrl(mainArticle.photo)}
                alt={mainArticle.title}
                className="w-full min-h-60 flex items-end h-full"
                imgClassName="object-cover"
                parentClassName="rounded-md col-span-2 row-span-2"
              >
                <div className="absolute inset-0 bg-linear-to-b from-light/10 to-dark/40 w-full h-full" />
                <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
                  <LuTag size={20} />
                  {mainArticle.category?.name || "Edukasi Kesehatan"}
                </span>

                <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
                  <span className="font-light">{convertDate(mainArticle.created_at)}</span>
                  <Link href={`/media-information/health-articles/${mainArticle.slug}/${mainArticle.id}`}>
                    <h3 className="font-semibold text-2xl line-clamp-2">{mainArticle.title}</h3>
                  </Link>
                </div>
              </Background>
              {sideArticles.map((article) => (
                <Card key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
