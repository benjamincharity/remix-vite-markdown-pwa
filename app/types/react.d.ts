/* eslint-disable no-unused-labels,@typescript-eslint/no-explicit-any */
import React from 'react';

declare module 'remark-sectionize' {}
declare module 'remark-emoji' {}
declare module 'remark-html' {}
declare module 'md2react' {}
declare module 'rehypeReact' {
  createElement: React.createElement;
}

// rehype-figure.d.ts
declare module '@microflash/rehype-figure' {
  // Define the module's exports here
  export default function rehypeFigure(options?: any): any;
}

declare module '@microflash/rehype-figure';
