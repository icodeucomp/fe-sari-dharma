"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { Button, Container, EmptyState, Img, LoadingState, Motion, Slider, Tab } from "@/components";

import { convertDate } from "@/utils";

import { FaArrowRightLong } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LuTag } from "react-icons/lu";
import { getHealthArticle } from "@/services/health-article.service";
import { useResponsiveLimit } from "@/hooks";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

export const Article = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const limit = useResponsiveLimit();

  const { data: featuredArticles = [], isLoading: loading } = useQuery({
    queryKey: ["health-articles", "featured", selectedCategoryId],
    queryFn: () => getHealthArticle({ per_page: 4, page: 1, category_id: selectedCategoryId }),
    select: (response) => response.data.data as any[],
    enabled: Boolean(selectedCategoryId),
  });
  const mainArticle = featuredArticles[0] ?? null;
  const sideArticles = featuredArticles.slice(1, 4);

  const { data: sliderResponse, isLoading: loadingSlider } = useQuery({
    queryKey: ["health-articles", "slider", page, limit],
    queryFn: () => getHealthArticle({ per_page: limit, page }),
    placeholderData: keepPreviousData,
  });
  const data: any[] = sliderResponse?.data.data ?? [];
  const totalPage = sliderResponse?.data.last_page ?? 0;

  const handleTabClick = React.useCallback((categoryId: string) => setSelectedCategoryId(categoryId), []);

  return (
    <>
      <Container className="py-16 space-y-8 lg:py-20 hidden lg:block">
        <div className="flex flex-col justify-between gap-6 sm:gap-0 sm:items-center sm:flex-row">
          <div className="space-y-2">
            <Motion tag="h4" initialY={-50} animateY={0} duration={0.4} className="heading">
              Artikel Kesehatan
            </Motion>
            <Motion tag="p" initialY={-50} animateY={0} duration={0.4} delay={0.3} className="subheading">
              Temukan berbagai tips kesehatan dan informasi medis disini.
            </Motion>
          </div>
          <Link href={"/media-information/health-articles"} className="block">
            <Button className="btn-outline">Lihat Semua</Button>
          </Link>
        </div>

        <Tab onTabClick={handleTabClick} selectedCategoryId={selectedCategoryId} />

        {loading ? (
          <LoadingState compact />
        ) : !mainArticle ? (
          <EmptyState compact title="Belum ada artikel" description="Artikel kesehatan akan segera dipublikasikan. Silakan kembali lagi nanti." />
        ) : (
          <div className="flex justify-between gap-12">
            <div className="w-full max-w-xl xl:max-w-lg">
              {mainArticle ? (
                <Motion tag="div" initialY={30} animateY={0} duration={1} delay={0.5} className="space-y-4 min-h-400 text-dark bg-light">
                  <Img src={getImageUrl(mainArticle.photo)} alt={mainArticle.title} className="w-full rounded-lg h-60" cover />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-8 py-2 rounded-md bg-secondary text-light">
                      <LuTag />
                      <p className="text-sm">{mainArticle.category.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoCalendarOutline />
                      <p className="text-sm text-gray">{convertDate(mainArticle.created_at)}</p>
                    </div>
                  </div>
                  <h4 className="text-base font-bold sm:text-xl line-clamp-1">{mainArticle.title}</h4>
                  <p className="text-sm text-justify line-clamp-5">
                    {mainArticle.content.replace(/<[^>]+>/g, "").length > 300
                      ? `${mainArticle.content.replace(/<[^>]+>/g, "").slice(0, 300)}...`
                      : mainArticle.content.replace(/<[^>]+>/g, "")}
                  </p>

                  <Link
                    href={`/media-information/health-articles/${mainArticle.slug}/${mainArticle.id}`}
                    className="flex max-w-25 items-center gap-2 btn-outline rounded-lg px-4 py-2 mt-0"
                  >
                    Lihat
                    <FaArrowRightLong />
                  </Link>
                </Motion>
              ) : null}
            </div>
            <div className="py-4 space-y-8">
              {sideArticles.length > 0
                ? sideArticles.map((article, index) => (
                    <Motion
                      tag="div"
                      initialY={30}
                      animateY={0}
                      duration={index * 0.4}
                      delay={index * 0.2}
                      key={article.id}
                      className="flex items-center justify-between w-full gap-4 lg:gap-8"
                    >
                      <div className="flex items-center gap-4">
                        <Img src={getImageUrl(article.photo)} alt={article.title} className="size-40 rounded-xl" cover />
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 px-8 py-2 rounded-md w-max bg-secondary text-light">
                            <LuTag />
                            <p className="text-sm">{article.category.name}</p>
                          </div>
                          <h4 className="max-w-sm text-base font-bold xl:text-lg lg:h-14">{article.title}</h4>
                          <div className="flex items-center gap-2">
                            <IoCalendarOutline />
                            <p className="text-xs lg:text-sm text-gray">{convertDate(article.created_at)}</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/media-information/health-articles/${article.slug}/${article.id}`}
                        className="flex items-center gap-2 btn-outline rounded-lg text-sm lg:text-base px-4 py-1.5 lg:py-2"
                      >
                        Lihat
                        <FaArrowRightLong />
                      </Link>
                    </Motion>
                  ))
                : null}
            </div>
          </div>
        )}
      </Container>

      <Slider
        page={page}
        setPage={setPage}
        title="Artikel Kesehatan"
        description="Temukan berbagai tips kesehatan dan informasi medis disini."
        totalPage={totalPage}
        parentClassName="block py-14 space-y-8 lg:hidden"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        loading={loadingSlider}
        emptyTitle="Belum ada artikel"
        emptyDescription="Artikel kesehatan akan segera dipublikasikan. Silakan kembali lagi nanti."
      >
        {data.map((item: any, index: number) => (
          <Motion
            tag="div"
            initialY={30}
            animateY={0}
            duration={1}
            delay={index * 0.1}
            key={item.id}
            className="rounded-lg shadow-lg min-h-400 text-dark bg-light"
          >
            <Img src={getImageUrl(item.photo)} alt={item.title} className="w-full rounded-lg h-60" cover />
            <div className="px-4 my-4 space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">{item.title}</h4>
              <p className="text-sm text-justify line-clamp-5">
                {item.content.replace(/<[^>]+>/g, "").length > 300
                  ? `${item.content.replace(/<[^>]+>/g, "").slice(0, 300)}...`
                  : item.content.replace(/<[^>]+>/g, "")}
              </p>
              <Link href={`/media-information/health-articles/${item.slug}/${item.id}`} className="block">
                <Button className="flex items-center gap-2 btn-primary group">
                  Selengkapnya
                  <FaArrowRightLong className="-rotate-45" />
                </Button>
              </Link>
            </div>
          </Motion>
        ))}
      </Slider>
    </>
  );
};
