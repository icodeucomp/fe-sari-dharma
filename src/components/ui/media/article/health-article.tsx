/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { Background, Container, Motion } from "@/components";
import { LuTag } from "react-icons/lu";
import { convertDate } from "@/utils";
import { getArtikelKesehatan } from "@/services/artikel-kesehatan.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk format URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({ artikel }: { artikel: any }) => {
  return (
    <Background 
      src={getImageUrl(artikel.foto)} 
      alt={artikel.judul} 
      className="w-full min-h-60 flex items-end" 
      imgClassName="object-cover" 
      parentClassName="rounded-md"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-light/10 to-dark/40 w-full h-full" />
      <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
        <LuTag size={20} />
        {artikel.kategori?.name}
      </span>

      <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
        <span className="text-xs font-light">{convertDate(artikel.created_at)}</span>
        <Link href={`/media-informasi/artikel-kesehatan/${artikel.slug}/${artikel.id}`}>
          <h3 className="font-semibold line-clamp-2">{artikel.judul}</h3>
        </Link>
      </div>
    </Background>
  );
};

export const HealthArticle = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [mainArticle, setMainArticle] = React.useState<any>(null);
  const [sideArticles, setSideArticles] = React.useState<any[]>([]);

  // Fungsi untuk mengambil data artikel
  const fetchArtikel = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getArtikelKesehatan({ per_page: 5, page: 1 });
      const articles = response.data.data;
      
      if (articles.length > 0) {
        console.log(articles);
        setMainArticle(articles[0]);
        setSideArticles(articles.slice(1));
      }
    } catch (error) {
      console.error('Error fetching artikel:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  return (
    <Container className="space-y-8">
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Artikel Kesehatan
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Temukan berbagai tips kesehatan dan informasi medis disini.
        </Motion>
      </div>

      <div className="grid grid-cols-4 pb-[100px] grid-rows-2 gap-4">
        {
          loading || !mainArticle ? (
            <div className="col-span-4 row-span-2 flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <Background 
                src={getImageUrl(mainArticle.foto)} 
                alt={mainArticle.judul} 
                className="w-full min-h-60 flex items-end h-full" 
                imgClassName="object-cover" 
                parentClassName="rounded-md col-span-2 row-span-2"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-light/10 to-dark/40 w-full h-full" />
                <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
                  <LuTag size={20} />
                  Edukasi Kesehatan
                </span>

                <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
                  <span className="font-light">{convertDate(mainArticle.created_at)}</span>
                  <Link href={`/media-informasi/artikel-kesehatan/${mainArticle.slug}/${mainArticle.id}`}>
                    <h3 className="font-semibold text-2xl line-clamp-2">{mainArticle.judul}</h3>
                  </Link>
                </div>
              </Background>
              {sideArticles.map((artikel) => (
                <Card key={artikel.id} artikel={artikel} />
              ))}
            </>
          )
        }
      </div>
    </Container>
  );
};
