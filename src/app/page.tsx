import { Article, Healthy, Hero, Overview, Review, Service, Specialize } from "@/components/ui/home";

import { SocialMedia } from "@/components/ui";

export default function Homes() {
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
