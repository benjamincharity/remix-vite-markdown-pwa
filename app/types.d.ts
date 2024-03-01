/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react';

declare module 'react' {
  interface CSSProperties {
    '--custom-color'?: string;
  }
}

declare module 'remark-sectionize' {}
declare module 'rehypeReact' {}
declare module 'remark-mdx-jsx' {}
