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
      <div className="w-[210px] min-w-[210px] border-r border-border min-h-screen">
        <ToolsSidebar />
      </div>
      <div className="grow h-screen flex flex-col">
        <MainHeader />
        <div className="grow p-6 overflow-y-auto bg-mesh">
          <div className="max-w-4xl animate-fade-up">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
