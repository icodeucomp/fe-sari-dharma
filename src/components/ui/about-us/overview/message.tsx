import { Img } from "@/components/image";

export const Message = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-primary">Klinik Utama Rawat Inap Sari Dharma Overview</h2>
      <div className="space-y-4 text-justify">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis reprehenderit amet praesentium harum, et cum, beatae quasi inventore ipsam velit necessitatibus eaque quis, accusantium
          deserunt! Aut minima quos nam itaque!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis reprehenderit amet praesentium harum, et cum, beatae quasi inventore ipsam velit necessitatibus eaque quis, accusantium
          deserunt! Aut minima quos nam itaque!
        </p>
      </div>
      <div className="flex text-center border border-gray/50">
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
      </div>
    </div>
  );
};
