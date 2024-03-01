import { ButtonHTMLAttributes } from 'react';

export function ModernButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, color = '--highlight-color-5', ...rest } = props;

  return (
    <button className="group relative px-6 py-3 font-bold text-black" {...rest}>
      <span
        className={`absolute inset-0 h-full w-full -translate-x-2 -translate-y-2 transform transition duration-300 ease-out bg-[${color}] group-hover:translate-x-0 group-hover:translate-y-0`}
      />
      <span className="absolute inset-0 h-full w-full border-4 border-black" />
      <span className="relative">{children}</span>
    </button>
  );
}
