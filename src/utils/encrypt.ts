import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
const algorithm = 'aes-256-cbc';
const iv = randomBytes(16);
const key = process.env.KEY;

export function encryptText(text) {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  });
}

export function decryptText(text) {
  const parsedText = JSON.parse(text);
  const iv = Buffer.from(parsedText.iv, 'hex');
  const encryptedText = Buffer.from(parsedText.encryptedData, 'hex');
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString();
}
