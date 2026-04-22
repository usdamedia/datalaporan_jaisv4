const encoder = new TextEncoder();

export async function sha256Hex(value: string): Promise<string> {
  const data = encoder.encode(value);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
