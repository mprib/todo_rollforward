import { arch } from 'os';

export function replaceToDoMarkers(input: string): string {
  // Existing implementation for replaceToDoMarkers
  return input.replace(/- \[ \]/g, '- []');
}


function removeDone(input: string): string {
  if (!input) return input;

  return input
    .split('\n')
    .filter(line => !line.includes('- [x]'))
    .join('\n');
}


export function filterList(input: string): string {
  
  const without_done = removeDone(input)

  const lines = without_done.split('\n');
  let result: string[] = [];
  let currentHeader = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Preserve all headers
    if (line.startsWith('#')) {
      currentHeader = line;
      result.push(line);
      continue;
    }
    
    // If we have a current header, preserve the line
    if (currentHeader) {
      result.push(line);
    }
  }
  
  return result.join('\n').trim();
}
