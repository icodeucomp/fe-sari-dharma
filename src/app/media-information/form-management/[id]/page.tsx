import { Breadcrumbs, Container } from "@/components";
import { MainFormManagement } from "@/components/ui/media";
import { formatTitleCase } from "@/utils";

export default async function FormManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-information/form-management" },
            { name: "Form Management", path: "/media-information/form-management" },
            { name: `${formatTitleCase(id)}`, path: `/media-information/form-management/${id}` },
          ]}
        />
      </Container>

      <MainFormManagement />
    </main>
  );
}
