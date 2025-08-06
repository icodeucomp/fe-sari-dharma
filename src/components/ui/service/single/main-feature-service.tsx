/* eslint-disable @next/next/no-img-element */
import { Button, Container, Motion } from "@/components";
import { Recommendation } from "./recommendation";

interface LayananDetail {
  id: string | number;
  nama_layanan: string;
  deskripsi: string;
  foto: string; // Keep this as foto since component uses this
  slug: string;
  created_at: string;
  updated_at: string;
}

interface MainFeatureServiceProps {
  layanan: LayananDetail;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk format URL gambar
const getImageUrl = (path: string) => {
  console.log("Image path:", path); // For debugging
  if (!path) return "/images/placeholder.jpg"; // Use placeholder if path is empty
  if (path.startsWith("http")) return path;

  const debug = `${BASE_URL}/storage/${path}`;
  console.log("Formatted image URL:", debug); // For debugging
  return debug;
};

export const MainFeatureService = ({ layanan }: MainFeatureServiceProps) => {
  const handleClick = (nama_layanan: string) => {
    const message = `Halo Admin,
Saya ingin mengetahui lebih lanjut mengenai *${nama_layanan}* Mohon bantuannya untuk konfirmasi ketersediaan jadwal tersebut.

Terima kasih.
`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6281318041828";
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  return (
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="text-4xl font-semibold text-primary">
          {layanan.nama_layanan}
        </Motion>

        {/* Image above description - using standard HTML img tag instead of Img component */}
        <div className="w-full">
          <img src={getImageUrl(layanan.foto)} alt={layanan.nama_layanan} className="w-full rounded-lg object-cover max-h-[400px]" />
        </div>

        <div dangerouslySetInnerHTML={{ __html: layanan.deskripsi }} />
        <div className="space-y-4 w-full">
          <h3 className="text-primary text-xl font-semibold">Informasi Seputar {layanan.nama_layanan}</h3>
          <Button onClick={() => handleClick(layanan.nama_layanan)} className="btn-green w-full">
            Chat Via Whatsapp
          </Button>
        </div>
      </div>

      <div className="sticky self-start h-screen space-y-8 overflow-y-auto scrollbar top-4 min-w-[340px]">
        <Recommendation />
      </div>
    </Container>
  );
};
