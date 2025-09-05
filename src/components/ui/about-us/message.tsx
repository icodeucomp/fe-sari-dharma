import { Img, Motion } from "@/components";

export const Message = () => {
  return (
    <div className="space-y-8">
      <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
        Sertifikasi & Penghargaan
      </Motion>
      <div className="space-y-4 leading-relaxed text-justify">
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3}>
          Klinik Utama Rawat Inap Sari Dharma merupakan klinik utama swasta yang berlokasi di Jalan Pulau Seram No. 1, Denpasar Barat, Bali. Dengan komitmen tinggi terhadap keselamatan pasien dan mutu
          pelayanan kesehatan, didukung oleh fasilitas medis yang lengkap dan modern serta tenaga kesehatan profesional dan berpengalaman di bidangnya. Klinik Sari Dharma menjadi salah satu rujukan
          layanan kesehatan rawat inap dan rawat jalan di wilayah Denpasar dan sekitarnya.
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.9} delay={0.3}>
          Beroperasi sejak tahun 2017, Klinik Utama Rawat Inap Sari Dharma terus berkembang untuk memenuhi kebutuhan masyarakat. Klinik ini dikenal dengan layanan unggulan di bidang jantung dan
          pembuluh darah, layanan treadmill dan holter jantung, audiometri, endoskopi tht, usg, radiologi, serta operasi katarak dengan metode phacoemulsifikasi. Dengan pelayanan yang cepat, nyaman,
          dan terlayani, Klinik Sari Dharma siap memberikan pengalaman kesehatan terbaik bagi pasien dan keluarga.
        </Motion>
      </div>
      <Motion tag="div" initialX={-50} animateX={0} duration={0.9} delay={0.6} className="flex text-center border border-gray/50">
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Alamat</h5>
          </div>
          <p>Jl. Pulau Seram No.1, Dauh Puri Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80113</p>
        </div>
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Hubungi Kami</h5>
          </div>
          <div className="space-y-1">
            <p>Call Center</p>
            <p>(0361) 226866</p>
          </div>
          <div className="space-y-1">
            <p>Emergency Call</p>
            <p>(0361) 226866</p>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2 border-r border-gray/50">
          <div className="space-y-1">
            <Img src="/icons/hospital.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Jam Operasional</h5>
          </div>
          <p>Buka setiap hari, 24 jam</p>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            <Img src="/icons/email.svg" alt="icon hospital" className="mx-auto size-12" />
            <h5 className="text-xl font-bold text-primary">Email</h5>
          </div>
          <p>saridharma@gmail.com</p>
        </div>
      </Motion>
    </div>
  );
};
