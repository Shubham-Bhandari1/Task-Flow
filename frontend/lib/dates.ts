/** HTML date inputs need YYYY-MM-DD; the API may return a full ISO timestamp. */
export function toDateInput(value?: string | null): string {
  if (!value) return '';
  return value.slice(0, 10);
}
