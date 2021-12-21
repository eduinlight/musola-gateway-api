import fs from 'fs';

export function saveJsonInFile(path: string, data: any) {
  try {
    fs.unlinkSync(path);
  } catch (e) {}
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
