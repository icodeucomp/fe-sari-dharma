import { Button, Container, Motion, Submenu } from "@/components";

import { Recommendation } from "./recommendation";

import { FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";

export const MainEventCommunity = () => {
  return (
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="text-4xl font-semibold text-primary">
            Peresmian Gedung Baru dengan Fasilitas Rawat Inap Modern
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <menu className="flex items-center gap-2">
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaInstagram size={20} />
              </li>
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaXTwitter size={20} />
              </li>
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaFacebook size={20} />
              </li>
            </menu>
            <Button className="flex items-center gap-1 btn-outline">
              Bagikan <FaLink />
            </Button>
          </Motion>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit corrupti, repellat nam voluptate ipsam, iusto ullam dolor voluptatum natus sed esse, sit possimus facilis odio repudiandae
          sunt temporibus distinctio cum ad consequuntur. Dolorem, aperiam voluptatem veniam ipsa non temporibus recusandae perspiciatis, ab alias tempore reiciendis libero cum accusamus, voluptatum
          quaerat! Porro ducimus quos inventore quas animi. Ipsa rerum perspiciatis ipsam fugit laudantium, voluptates deleniti reiciendis explicabo sequi magni quidem? Quae aspernatur minima
          voluptatum distinctio corporis est maxime sed dignissimos iure laudantium sapiente voluptatem voluptas explicabo cupiditate vero, tempore sit? Magni odit, iusto ut unde quaerat quasi
          explicabo adipisci sint ex eveniet laborum nam ullam ipsam est maiores tenetur provident id minima autem molestiae suscipit aut nemo. Natus, aliquam cum quae culpa ea consectetur alias iste
          vel necessitatibus provident, possimus ut, iusto velit sit laudantium dicta magnam amet perferendis? Molestias voluptatibus vero non, eius in quam hic veniam explicabo, eaque harum adipisci
          nemo impedit nam quasi omnis numquam sint sed reiciendis consequatur perferendis. Possimus corrupti dolorem laudantium expedita aliquid est voluptate nemo earum. Obcaecati delectus aperiam
          doloremque quos deleniti dolores placeat, quas consequatur repudiandae? Amet consectetur, optio alias inventore ipsum, doloribus nisi deserunt, eos consequatur adipisci dicta debitis
          sapiente numquam aliquid? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ad, quibusdam nihil perspiciatis iure alias sit voluptatum hic exercitationem consectetur
          blanditiis dicta beatae distinctio ab saepe molestias praesentium minima atque. Natus quae similique veniam dolorem quaerat, nesciunt sed commodi praesentium a, facere officia eius. Aut
          accusamus delectus laborum impedit, nesciunt sapiente enim soluta adipisci culpa hic animi velit fuga facilis laboriosam ducimus quam maiores rerum odit vel sit labore voluptate! Nam
          eligendi quo harum laborum non. Porro blanditiis quaerat adipisci consequuntur quia laboriosam qui nemo velit tenetur. Et, optio earum! Nesciunt voluptate corporis praesentium totam
          voluptatibus, assumenda odit ducimus aliquam dolorum libero, quaerat explicabo ex placeat, aperiam soluta quos quas debitis nemo voluptates neque maxime. Adipisci voluptatum hic officia
          architecto numquam omnis iste aspernatur ipsam rem eveniet. Eveniet vero sapiente mollitia vitae nam aliquid, cum, voluptatem laboriosam magni rem, harum nihil accusantium. Autem impedit
          asperiores deleniti modi voluptate eum quasi architecto nobis accusamus possimus numquam officia eius recusandae a ea, quaerat nemo repudiandae beatae blanditiis enim veniam repellat
          perferendis iure illum. Id quibusdam aperiam ut recusandae obcaecati debitis? Eum adipisci modi facilis voluptate iusto voluptatum. Quisquam nemo dolorem exercitationem rerum porro veniam,
          possimus magnam in quos quibusdam culpa quam asperiores esse necessitatibus laborum cupiditate aliquid corrupti eaque ipsam officia doloribus veritatis fugiat. Excepturi voluptates optio
          deserunt eos vero repellendus animi repudiandae nemo, consequuntur explicabo harum. Assumenda architecto quia cum in sed amet quam dolorem quibusdam saepe pariatur, sint excepturi numquam
          expedita suscipit tempora quasi, qui nihil debitis labore, distinctio dignissimos hic id harum? Non consequatur numquam, at odio illo iste alias recusandae ullam, quos, culpa veniam et nulla
          praesentium eum. Voluptatem rem amet ratione laudantium voluptatum, dolorum, maiores quis atque veniam impedit repellendus asperiores. Nihil enim porro asperiores ducimus consequuntur, cum
          culpa officia fuga molestias quo repellat voluptatibus vitae similique nesciunt corporis, quasi reprehenderit, ullam et voluptas. Repudiandae laboriosam ut nemo. Quisquam, quia doloremque
          ipsam dignissimos fugit et deserunt delectus sed excepturi odio, iste possimus quasi officia, pariatur quibusdam esse assumenda laboriosam ea harum fuga quis accusamus quod optio natus?
          Quasi fugit alias vitae a exercitationem itaque temporibus minima nostrum quo ipsum quos ipsam eligendi excepturi corporis dolorem, quidem placeat nesciunt enim reprehenderit voluptatem,
          aliquid consequuntur. Hic voluptates consequatur magni alias tenetur nisi odio. Quasi architecto incidunt vitae id consequatur a libero itaque nihil earum. Obcaecati, quam molestias amet,
          nisi enim excepturi cupiditate, eaque doloremque nostrum ratione minus odio vero!
        </div>
      </div>

      <div className="sticky self-start h-screen space-y-8 overflow-y-auto scrollbar top-4 min-w-[340px]">
        <Submenu
          menu="Akses Menu"
          title="Tentang Kami"
          items={[
            { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
            { title: "Event & Community", link: "/media-informasi/event-community" },
            { title: "Paket Kesehatan", link: "/media-informasi/form-management" },
            { title: "Indikator Mutu", link: "/media-informasi/indikator-mutu" },
            { title: "Karir", link: "/media-informasi/karir" },
            { title: "Form Management", link: "/media-informasi/form-management" },
          ]}
        />

        <Recommendation />
      </div>
    </Container>
  );
};
