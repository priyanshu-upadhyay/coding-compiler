function decodeBase64String(encodedString: string): string {
  const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
  return decodedString;
}

function decodeBase64ArrayOfStrings(encodedStrings: string[]): string[] {
  const decodedStrings = encodedStrings.map(encodedString =>
    Buffer.from(encodedString, 'base64').toString('utf-8'),
  );
  return decodedStrings;
}

export {decodeBase64String, decodeBase64ArrayOfStrings};