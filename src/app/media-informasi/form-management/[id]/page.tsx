import { Breadcrumbs, Container } from "@/components";
import { MainFormManagement } from "@/components/ui/media";
import { formatTitleCase } from "@/utils";

export default function FormManagementPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/form-management" },
            { name: "Form Management", path: "/media-informasi/form-management" },
            { name: `${formatTitleCase(params.id)}`, path: `/media-informasi/form-management/${params.id}` },
          ]}
        />
      </Container>

      <MainFormManagement />
    </main>
  );
}
