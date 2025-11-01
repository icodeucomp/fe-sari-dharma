import { Background } from "../background";
import { Container } from "../container";

export const Hero = ({ titlePage, title, src }: { titlePage: string; title: string; src: string }) => {
  return (
    <Container className="sm:pt-16 !px-0 sm:!px-8">
      <Background src={src} alt={title} className="flex items-center px-8 min-h-300" imgClassName="object-cover object-top">
        <div className="absolute inset-0 w-full h-full bg-dark/20"></div>
        <div className="max-w-2xl space-y-2 z-1">
          <h4 className="text-lg md:text-xl lg:text-2xl font-medium">{titlePage}</h4>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h1>
        </div>
      </Background>
    </Container>
  );
};
