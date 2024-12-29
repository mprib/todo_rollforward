import { arch } from 'os';

export function replaceToDoMarkers(input: string): string {
  // Existing implementation for replaceToDoMarkers
  return input.replace(/- \[ \]/g, '- []');
}

export function filterDone(input: string): string {
  const lines = input.split('\n');
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
    
    // Skip done items 
    if (line.includes('- [x]') ) {
      continue;
    }
    
    // If we have a current header, preserve the line
    if (currentHeader) {
      result.push(line);
    }
  }
  
  // Join with newlines and ensure single newline at end
  return result.join('\n') + '\n';
}
