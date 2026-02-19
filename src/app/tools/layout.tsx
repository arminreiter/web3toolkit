'use client';

import { ToolsSidebar } from '@/components/ToolsSidebar';
import { MainHeader } from '@/components/layout/MainHeader';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-[220px] min-w-[220px] border-r border-border min-h-screen">
        <ToolsSidebar />
      </div>
      <div className="grow h-screen flex flex-col">
        <MainHeader />
        <div className="grow p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
