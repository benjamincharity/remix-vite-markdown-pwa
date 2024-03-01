export function escapeXml(unsafeString: string): string {
  return unsafeString
    .replace(/&/g, '&amp;') // Replace & with &amp;
    .replace(/</g, '&lt;') // Replace < with &lt;
    .replace(/>/g, '&gt;') // Replace > with &gt;
    .replace(/"/g, '&quot;') // Replace " with &quot;
    .replace(/'/g, '&apos;'); // Replace ' with &apos;
}
