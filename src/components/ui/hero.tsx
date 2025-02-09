import { Background } from "../background";
import { Container } from "../container";

export const Hero = ({ titlePage, title }: { titlePage: string; title: string }) => {
  return (
    <Container className="pt-16 pb-8">
      <Background src="/images/suzy-1.jpg" alt={title} className="flex items-center px-8 min-h-300" imgClassName="object-cover object-top">
        <div className="absolute inset-0 w-full h-full bg-dark/20"></div>
        <div className="max-w-2xl space-y-2 z-1">
          <h4 className="text-2xl font-medium">{titlePage}</h4>
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </Background>
    </Container>
  );
};
