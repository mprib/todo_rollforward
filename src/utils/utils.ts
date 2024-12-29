import { arch } from 'os';

export function replaceToDoMarkers(input: string): string {
  // Existing implementation for replaceToDoMarkers
  return input.replace(/- \[ \]/g, '- []');
}

export function filterDone(input: string): string {
}
