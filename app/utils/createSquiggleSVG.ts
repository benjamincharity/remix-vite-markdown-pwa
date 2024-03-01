/**
 * Generate the squiggle SVG with a specific color
 *
 * @param color - The color to use in the SVG
 * @returns The SVG string
 */
export function createSquiggleSVG(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 4"><style type="text/css">.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}</style><path fill="none" stroke="${color}" stroke-width="2" class="squiggle" d="M0 3.5c5 0 5-3 10-3s5 3 10 3c5 0 5-3 10-3s5 3 10 3"/></svg>`;
}
