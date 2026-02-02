import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { decryptPDFFile } from '@/lib/pdf-crypto';
import { getLocaleFromRequest, getErrorMessage } from '@/lib/i18n-utils';

export async function POST(request: NextRequest) {
  let tempInputPath = '';
  let tempOutputPath = '';

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    const locale = getLocaleFromRequest(request);

    if (!file) {
      const errorMessage = await getErrorMessage(locale, 'noFileProvided');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    if (!password) {
      const errorMessage = await getErrorMessage(locale, 'noPasswordProvided');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // 创建临时文件路径
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    tempInputPath = join(tmpdir(), `input_${timestamp}_${random}.pdf`);
    tempOutputPath = join(tmpdir(), `output_${timestamp}_${random}.pdf`);

    // 保存上传的文件到临时文件
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(tempInputPath, buffer);

    // 解密文件
    await decryptPDFFile(tempInputPath, tempOutputPath, password);

    // 读取解密后的文件
    const decryptedBuffer = await readFile(tempOutputPath);

    // 返回解密后的 PDF
    // 对文件名进行 URL 编码以支持非 ASCII 字符
    const originalName = file.name.replace('.pdf', '');
    const encodedFileName = encodeURIComponent(originalName + '_decrypted.pdf');
    const contentDisposition = `attachment; filename*=UTF-8''${encodedFileName}`;

    return new NextResponse(decryptedBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error: any) {
    console.error('Decryption error:', error);
    const locale = getLocaleFromRequest(request);

    if (error.message?.includes('Incorrect password') || error.message?.includes('corrupted')) {
      const errorMessage = await getErrorMessage(locale, 'incorrectPassword');
      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    const errorMessage = await getErrorMessage(locale, 'decryptionFailed');
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    // 清理临时文件
    try {
      if (tempInputPath) await unlink(tempInputPath);
      if (tempOutputPath) await unlink(tempOutputPath);
    } catch (error) {
      console.error('Error cleaning up temp files:', error);
    }
  }
}
