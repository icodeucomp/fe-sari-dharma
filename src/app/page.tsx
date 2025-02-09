import { Article, Healthy, Hero, Overview, Review, Service, SocialMedia, Specialize } from "@/components/ui/home";

export default function Home() {
  return (
    <main>
      <Hero />
      <Overview />
      <Service />
      <Specialize />
      <Healthy />
      <Review />
      <Article />
      <SocialMedia />
    </main>
  );
}
