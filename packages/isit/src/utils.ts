export function getTagType(o: unknown): string {
  const tag = Object.prototype.toString.call(o);
  return tag.replace(/[[\]]/g, '').split(/\s+/).slice(1).join(' ');
}
