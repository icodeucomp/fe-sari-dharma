import { Article, Hero, Overview, Service, Specialize } from "@/components/ui/home";

import { SocialMedia } from "@/components/ui";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Overview />
      <Service />
      <Specialize />
      {/* <Review /> */}
      <Article />
      <SocialMedia />
    </main>
  );
}
