
export function replaceToDoMarkers(text: string): string {
  return text.replace(/- \[ \]/g, '- []');
}
