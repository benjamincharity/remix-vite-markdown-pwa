/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
import { FixMeLater } from '~/types/shame';

declare module '@microflash/rehype-figure' {
  // Define the module's exports here
  export default function rehypeFigure(options?: FixMeLater): FixMeLater;
}
