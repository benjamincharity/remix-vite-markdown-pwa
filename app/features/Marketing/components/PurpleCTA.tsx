import React from 'react';

export function PurpleCTA({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 rounded-lg border-[1px] border-black bg-black bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 p-8 text-center text-white dark:bg-opacity-50 md:px-20 md:py-20 lg:gap-12">
      {children}
    </div>
  );
}
