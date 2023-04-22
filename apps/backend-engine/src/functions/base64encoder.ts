import * as fs from 'fs';

// async function encodeBase64OutputFiles(path: string): Promise<string[]> {
//   const files = fs.readdirSync(path);
//   const encodedFiles: string[] = [];
//   for (const file of files) {
//     if (file.startsWith('output')) {
//       const fileData = fs.readFileSync(`${path}/${file}`);
//       const encodedFile = fileData.toString('base64');
//       encodedFiles.push(encodedFile);
//     }
//   }
//   return encodedFiles;
// }

async function encodeFileBase64String(path: string, fileName: string): Promise<string> {
  const fileData = fs.readFileSync(`${path}/${fileName}`);
  const encodedFile = fileData.toString('base64');
  return encodedFile;
}

export {encodeFileBase64String};