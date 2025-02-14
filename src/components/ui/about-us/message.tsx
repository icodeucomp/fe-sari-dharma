import { Img, Motion } from "@/components";

export const Message = () => {
  return (
    <div className="space-y-8">
      <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
        Sertifikasi & Penghargaan
      </Motion>
      <div className="space-y-4 leading-relaxed text-justify">
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3}>
          Urna molestie maximus etiam tempus ipsum conubia lacus integer duis. Metus elementum fermentum dui feugiat congue natoque platea eros dolor. Ac massa venenatis etiam fringilla vel congue
          condimentum egestas curae fermentum enim. Est per pharetra tincidunt purus morbi elementum natoque finibus. Aliquet pellentesque fames curae dis nullam letius nec litora. Viverra est iaculis
          felis libero si hac. Faucibus platea porttitor tellus congue lacinia. Interdum nascetur cras fringilla rutrum pellentesque duis posuere finibus quis. Tortor non mattis auctor elit
          sollicitudin dolor laoreet euismod.
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.9} delay={0.3}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere illo dolor quaerat blanditiis cum vel, rerum perferendis rem molestias quia voluptates quos dignissimos, distinctio doloribus
          aliquid mollitia sequi quis alias eius et numquam reiciendis. Fugit tenetur sed vitae incidunt neque at minima eius possimus iusto, odit assumenda nemo et! Deserunt, placeat consequuntur.
          Deleniti quidem officia sunt praesentium aspernatur assumenda quisquam veniam aut, nulla temporibus! Rerum commodi voluptatum cum. Alias quae aliquid nulla itaque, error eveniet possimus nam
          facere voluptatibus quis?
        </Motion>
      </div>
      <Motion tag="div" initialX={-50} animateX={0} duration={0.9} delay={0.6} className="flex text-center border border-gray/50">
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Alamat</h5>
          </div>
          <p>Jl Syech Quro No. 14, Lamaran, Palumbonsari, Karawang Timur</p>
        </div>
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Hubungi Kami</h5>
          </div>
          <div className="space-y-1">
            <p>Call Center</p>
            <p>0267 845 2555</p>
          </div>
          <div className="space-y-1">
            <p>Emergency Call</p>
            <p>0821 1110 2355</p>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Jam Operational</h5>
          </div>
          <p>Weekdays: 08.00 - 17.00</p>
          <div className="space-y-1">
            <h5 className="text-xl font-bold text-primary">Jam Kunjungan</h5>
            <p>10.00 - 13.00 WIB</p>
            <p>17.00 - 19.00 WIB</p>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Jam Operational</h5>
          </div>
          <p>saridharma@gmail.com</p>
        </div>
      </Motion>
    </div>
  );
};
