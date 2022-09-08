import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
const algorithm = 'aes-256-ctr';
const password = `${process.env.PASSWORD}`;

export async function encryptText(text) {
  const iv = randomBytes(16);
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv(algorithm, key, iv);
  const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encryptedText.toString('hex'),
  });
}

export async function decryptText(text) {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const parsedText = JSON.parse(text);
  const iv = Buffer.from(parsedText.iv, 'hex');
  const decipher = createDecipheriv(algorithm, key, iv);
  const encryptedText = Buffer.from(parsedText.encryptedData, 'hex');
  return Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]).toString();
}
