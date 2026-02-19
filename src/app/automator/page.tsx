'use client';

import { MainHeader } from '@/components/layout/MainHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { ActionsInUse } from '@/components/ActionsInUse';
import { InputOutput } from '@/components/InputOutput';

export default function AutomatorPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[220px] min-w-[220px] border-r border-border h-screen">
        <Sidebar />
      </div>
      <div className="grow flex flex-col">
        <MainHeader />
        <div className="flex grow overflow-hidden">
          <div className="w-5/12 min-w-[220px] p-2 overflow-y-auto bg-[#080d18]/50 border-r border-border/50">
            <ActionsInUse />
          </div>
          <div className="w-7/12 min-w-[220px] p-2 overflow-y-auto">
            <InputOutput />
          </div>
        </div>
      </div>
    </div>
  );
}
