import { AppSidebar } from '@components/components/app-sidebar';
import { DataTable } from '@components/components/data-table';
import { SectionCards } from '@components/components/section-cards';
import { SiteHeader } from '@components/components/site-header';
import { SidebarInset, SidebarProvider } from '@components/components/ui/sidebar';
import data from './data.json';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
