import { Background, Button, Motion } from "@/components";

export const DetailServiceFacility = () => {
  return (
    <div className="space-y-4">
      <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
        Laboratorium
      </Motion>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In minus maxime earum! Ullam fugit, tempore, suscipit, non ex praesentium impedit nesciunt unde quam dolores dolore. Fuga vel eius
        eligendi beatae aperiam? Voluptas blanditiis non veniam sapiente ratione repudiandae architecto culpa dolore, neque corrupti asperiores in sed debitis harum esse fugiat nobis numquam, facilis
        pariatur obcaecati? Voluptate beatae ullam ipsam temporibus, quidem, adipisci doloribus quam excepturi sit autem, dolorum cupiditate dolore aspernatur quis commodi amet architecto delectus.
        Quidem saepe corrupti consequuntur iste quam perspiciatis tempora, sunt voluptas. Voluptate, quasi sequi quisquam fugit aperiam ab tenetur voluptatibus laborum eaque sed cupiditate eveniet.
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <Background src="/images/temp-4.png" alt="temp" className="w-full min-h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gray/20 w-full h-full" />
            <span className="absolute bottom-0 left-0 rounded-se-md bg-secondary px-8 py-2">7 Pictures</span>
          </Background>
          <h3 className="text-xl font-semibold line-clamp-1">Aktivitas & Kegiatan Lainnya</h3>
          <Button className="border border-primary text-primary hover:bg-primary hover:text-light">View More</Button>
        </div>
        <div className="space-y-2">
          <Background src="/images/temp-4.png" alt="temp" className="w-full min-h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gray/20 w-full h-full" />
            <span className="absolute bottom-0 left-0 rounded-se-md bg-secondary px-8 py-2">5 Pictures</span>
          </Background>
          <h3 className="text-xl font-semibold line-clamp-1">Alat-alat Laboratorium</h3>
          <Button className="border border-primary text-primary hover:bg-primary hover:text-light">View More</Button>
        </div>
      </div>
    </div>
  );
};
