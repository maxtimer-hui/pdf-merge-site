import { scrypt as scryptAsync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const scrypt = promisify(scryptAsync);

/**
 * 使用 AES-256-CBC 加密 PDF 文件
 * 注意：这是一个文件级加密，不是 PDF 标准加密
 */
export async function encryptPDFFile(
  inputPath: string,
  outputPath: string,
  password: string
): Promise<void> {
  // 读取原始 PDF
  const pdfData = await readFile(inputPath);

  // 生成密钥和 IV
  const salt = randomBytes(32);
  const key = await scrypt(password, salt, 32) as Buffer;
  const iv = randomBytes(16);

  // 创建加密器
  const cipher = createCipheriv('aes-256-cbc', key, iv);

  // 加密数据
  const encrypted = Buffer.concat([cipher.update(pdfData), cipher.final()]);

  // 写入加密文件：salt + iv + encrypted data
  const encryptedData = Buffer.concat([salt, iv, encrypted]);
  await writeFile(outputPath, encryptedData);
}

/**
 * 使用 AES-256-CBC 解密 PDF 文件
 */
export async function decryptPDFFile(
  inputPath: string,
  outputPath: string,
  password: string
): Promise<void> {
  // 读取加密文件
  const encryptedData = await readFile(inputPath);

  // 提取 salt, iv 和 encrypted data
  const salt = encryptedData.subarray(0, 32);
  const iv = encryptedData.subarray(32, 48);
  const encrypted = encryptedData.subarray(48);

  // 生成密钥
  const key = await scrypt(password, salt, 32) as Buffer;

  // 创建解密器
  const decipher = createDecipheriv('aes-256-cbc', key, iv);

  // 解密数据
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  // 验证解密后的数据是否是有效的 PDF
  // 直接检查前几个字节而不是转换为字符串，避免编码问题
  const pdfHeader = Buffer.from([0x25, 0x50, 0x44, 0x46]); // '%PDF'
  if (decrypted.length < 4 || !decrypted.subarray(0, 4).equals(pdfHeader)) {
    throw new Error('Incorrect password or corrupted file');
  }

  // 写入解密后的文件
  await writeFile(outputPath, decrypted);
}
