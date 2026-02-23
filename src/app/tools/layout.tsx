'use client';

import { useState } from 'react';
import { ToolsSidebar } from '@/components/ToolsSidebar';
import { MainHeader } from '@/components/layout/MainHeader';
import { PanelLeft, X } from 'lucide-react';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[320px] min-w-[320px] border-r border-border/50 h-full">
        <ToolsSidebar />
      </div>

      {/* Mobile/Tablet sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="absolute top-0 left-0 bottom-0 w-[300px] bg-background border-r border-border/50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Tools</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ToolsSidebar hideHeader />
          </div>
        </div>
      )}

      <div className="grow h-full flex flex-col min-w-0">
        <MainHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showSidebarToggle
        />
        <div className="grow p-5 sm:p-6 overflow-y-auto bg-mesh">
          <div className="animate-fade-up">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
