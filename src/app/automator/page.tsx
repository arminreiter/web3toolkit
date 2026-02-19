'use client';

import { MainHeader } from '@/components/layout/MainHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { ActionsInUse } from '@/components/ActionsInUse';
import { InputOutput } from '@/components/InputOutput';

export default function AutomatorPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[240px] min-w-[240px] border-r border-border/50 h-screen">
        <Sidebar />
      </div>
      <div className="grow flex flex-col">
        <MainHeader />
        <div className="flex grow overflow-hidden">
          <div className="w-5/12 min-w-[240px] p-3 overflow-y-auto bg-secondary/40 border-r border-border/50">
            <ActionsInUse />
          </div>
          <div className="w-7/12 min-w-[240px] p-3 overflow-y-auto">
            <InputOutput />
          </div>
        </div>
      </div>
    </div>
  );
}
