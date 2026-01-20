import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { encryptPDFFile } from '@/lib/pdf-crypto';

export async function POST(request: NextRequest) {
  let tempInputPath = '';
  let tempOutputPath = '';

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: 'No password provided' }, { status: 400 });
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

    // 加密文件
    await encryptPDFFile(tempInputPath, tempOutputPath, password);

    // 读取加密后的文件
    const encryptedBuffer = await readFile(tempOutputPath);

    // 返回加密后的 PDF
    // 对文件名进行 URL 编码以支持非 ASCII 字符
    const originalName = file.name.replace('.pdf', '');
    const encodedFileName = encodeURIComponent(originalName + '_encrypted.pdf');
    const contentDisposition = `attachment; filename*=UTF-8''${encodedFileName}`;

    return new NextResponse(encryptedBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error: any) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: error.message || 'Encryption failed' },
      { status: 500 }
    );
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
