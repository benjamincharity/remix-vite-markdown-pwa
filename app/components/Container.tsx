import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-5">
      {children}
    </div>
  );
}
