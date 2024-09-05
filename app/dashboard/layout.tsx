import { Header } from '@/components/header'
import { DefaultSidebar } from '@/components/sidebar';


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
			<DefaultSidebar />
      <div className={`flex-1 transition-all duration-100`}>
        <Header />
        <main className="flex flex-col flex-1 bg-muted/50">
          <div className="relative flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
