import { Img, Motion } from "@/components";

export const Ambulance = () => {
  return (
    <div className="space-y-8">
      <Motion tag="h2" initialY={-50} animateY={0} duration={0.3} className="heading">
        Informasi Ambulans
      </Motion>
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row">
          <Img src="/images/ambulance-car.webp" alt="ambulance car picture" className="w-full min-h-60" cover />
          <Img src="/images/ambulance-cars.webp" alt="ambulance car picture" className="w-full min-h-60" cover />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <Motion tag="div" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="text-justify pr-4 space-y-1 sm:space-y-2 w-full text-sm md:text-base">
            <p>
              Klinik Utama Rawat Inap Sari Dharma menyediakan layanan ambulans dan gawat darurat 24 jam untuk memenuhi kebutuhan mendasar masyarakat sekitar dalam mendapatkan pelayanan kesehatan yang
              cepat dan tanggap dalam situasi darurat.
            </p>
            <ul className="list-disc pl-8">
              <li>Penjemputan pasien gawat darurat radius 20km</li>
              <li>Pasien rujukan dari fasilitas kesehatan lain</li>
            </ul>
            <p>Nomor ambulance menjadi salah satu nomor yang wajib dicatat di daftar kontak telepon seluler. Berikut nomor Whatsapp Khusus untuk Emergency</p>
          </Motion>
          <Motion tag="div" initialY={-50} animateY={0} duration={0.6} delay={0.3} className=" w-full">
            <div className="py-8 border-t border-x p-4 lg:px-0 lg:border-x-0 border-b border-gray/50 flex gap-2 items-center">
              <Img src="/icons/time-zone.svg" alt="icon ambulance" className="size-10 md:size-12" cover />
              <div className="space-y-1">
                <h5 className="text-primary text-base md:text-lg font-semibold">Waktu Layanan</h5>
                <h4 className="text-dark text-lg md:text-xl font-bold">24 Jam</h4>
              </div>
            </div>
            <div className="py-8 border-x p-4 lg:px-0 lg:border-x-0 border-b border-gray/50 flex gap-2 items-center">
              <Img src="/icons/ambulance-plus.svg" alt="icon ambulance" className="size-10 md:size-12" cover />
              <div className="space-y-1">
                <h5 className="text-primary text-base md:text-lg font-semibold">Emergency Call</h5>
                <h4 className="text-dark text-lg md:text-xl font-bold">08113881248</h4>
                <small className="text-gray">*Whatsapp</small>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>
  );
};
