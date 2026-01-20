import { PDFDocument } from 'pdf-lib';

export interface PDFFile {
  file: File;
  id: string;
}

// 合并PDF
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

// 分割PDF - 按页数范围
export async function splitPDFByRange(
  file: File,
  ranges: string[]
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: { name: string; bytes: Uint8Array }[] = [];

  for (const range of ranges) {
    const newPdf = await PDFDocument.create();
    const pages = parsePageRange(range, pdf.getPageCount());

    for (const pageNum of pages) {
      const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1]);
      newPdf.addPage(copiedPage);
    }

    const bytes = await newPdf.save();
    results.push({
      name: `${file.name.replace('.pdf', '')}_pages_${range}.pdf`,
      bytes,
    });
  }

  return results;
}

// 分割PDF - 每N页
export async function splitPDFEvery(file: File, n: number): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  const results: Uint8Array[] = [];

  for (let i = 0; i < totalPages; i += n) {
    const newPdf = await PDFDocument.create();
    const endPage = Math.min(i + n, totalPages);

    for (let j = i; j < endPage; j++) {
      const [copiedPage] = await newPdf.copyPages(pdf, [j]);
      newPdf.addPage(copiedPage);
    }

    results.push(await newPdf.save());
  }

  return results;
}

// 提取页面
export async function extractPages(file: File, pages: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  const sortedPages = [...pages].sort((a, b) => a - b);

  for (const pageNum of sortedPages) {
    const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1]);
    newPdf.addPage(copiedPage);
  }

  return newPdf.save();
}

// 压缩PDF
export async function compressPDF(
  file: File,
  options: {
    imageQuality?: number;
    deleteUnused?: boolean;
  } = {}
): Promise<{ bytes: Uint8Array; originalSize: number; compressedSize: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // 删除未使用的对象
  if (options.deleteUnused) {
    // pdf-lib 会自动处理一些优化
  }

  const bytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return {
    bytes,
    originalSize: arrayBuffer.byteLength,
    compressedSize: bytes.byteLength,
  };
}

// 解析页面范围 (例如: "1-3,5,7-9")
function parsePageRange(range: string, totalPages: number): number[] {
  const pages: number[] = [];
  const parts = range.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= totalPages) {
          pages.push(i);
        }
      }
    } else {
      const page = Number(trimmed);
      if (page >= 1 && page <= totalPages) {
        pages.push(page);
      }
    }
  }

  return pages;
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// 下载PDF
export function downloadPDF(bytes: Uint8Array, filename: string) {
  const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 旋转PDF
export async function rotatePDF(
  file: File,
  rotations: { page: number; degrees: number }[]
): Promise<Uint8Array> {
  const { degrees } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  for (const { page, degrees: deg } of rotations) {
    const pdfPage = pdf.getPage(page - 1);
    const currentRotation = pdfPage.getRotation().angle;
    pdfPage.setRotation(degrees(currentRotation + deg));
  }

  return pdf.save();
}

// 删除页面
export async function deletePages(file: File, pagesToDelete: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  const sortedPages = [...pagesToDelete].sort((a, b) => b - a);

  for (const pageNum of sortedPages) {
    pdf.removePage(pageNum - 1);
  }

  return pdf.save();
}

// 重新排序页面
export async function reorderPages(file: File, newOrder: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  for (const pageNum of newOrder) {
    const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1]);
    newPdf.addPage(copiedPage);
  }

  return newPdf.save();
}

// 加密PDF
// 注意：pdf-lib 的加密功能有限
// 完整的 PDF 加密（RC4/AES）需要使用其他库如 pdf-encrypt
// 这里提供一个占位实现，实际使用需要添加额外的加密库
export async function encryptPDF(
  file: File,
  password: string,
  options: {
    ownerPassword?: string;
    userPassword?: string;
    permissions?: {
      printing?: 'highResolution' | 'lowResolution' | boolean;
      modifying?: boolean;
      copying?: boolean;
      annotating?: boolean;
      fillingForms?: boolean;
      contentAccessibility?: boolean;
      documentAssembly?: boolean;
    };
  } = {}
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // 注意：pdf-lib 1.17.1 版本不支持完整的 PDF 加密功能
  // 实际的 PDF 加密需要使用专门的库，如：
  // - pdf-encrypt (Node.js)
  // - react-pdf-js (browser)
  // 或者在服务端处理

  // 这里暂时返回未加密的 PDF 并在控制台警告
  console.warn('PDF 加密功能需要额外的库支持。当前返回未加密的文档。');

  // TODO: 实现真正的加密功能，可以考虑：
  // 1. 使用 https://www.npmjs.com/package/pdf-encrypt (需要 Node.js)
  // 2. 使用服务端 API 处理加密
  // 3. 等待 pdf-lib 添加完整加密支持

  return pdf.save();
}

// 解密PDF
// 注意：pdf-lib 1.17.1 不支持解密加密的 PDF
// 完整的解密功能需要使用其他库
export async function decryptPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();

  // pdf-lib 当前版本不支持解密
  // 真正的解密需要专门的库
  throw new Error('PDF 解密功能需要额外的库支持。建议使用 Adobe Acrobat 或在线工具进行解密。');

  /* 当支持解密时的实现示例：
  try {
    const pdf = await PDFDocument.load(arrayBuffer, {
      // 密码参数（当 pdf-lib 支持时）
    });

    // 保存为未加密的PDF
    return pdf.save();
  } catch (error: any) {
    if (error.message?.includes('password') || error.message?.includes('encrypted')) {
      throw new Error('密码错误或PDF文件已损坏');
    }
    throw error;
  }
  */
}

// 检查PDF是否加密
// 注意：pdf-lib 不提供此功能，这里返回 false
export async function isPDfEncrypted(file: File): Promise<boolean> {
  // pdf-lib 无法检测 PDF 是否加密
  // 实际实现需要使用其他库
  return false;
}

// 添加水印
export async function addWatermark(
  file: File,
  options: {
    text: string;
    opacity?: number;
    fontSize?: number;
    color?: string;
    position?: 'diagonal' | 'center' | 'tile';
  } = { text: 'Watermark' }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // 注册 fontkit 以支持中文字体
  const fontkit = await import('@pdf-lib/fontkit');
  pdf.registerFontkit(fontkit.default);

  const pages = pdf.getPages();

  const { rgb } = await import('pdf-lib');
  const opacity = options.opacity ?? 0.3;
  const fontSize = options.fontSize ?? 50;

  // 检测是否包含非 ASCII 字符（如中文）
  const hasNonAscii = /[^\x00-\x7F]/.test(options.text);

  let font: any;
  if (hasNonAscii) {
    // 从 Google Fonts 加载思源黑体
    const fontUrl = 'https://fonts.gstatic.com/s/notosanssc/v36/k3kJo84MPvpLmixcA63oeALZTYKLgASIOQ.woff2';
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    font = await pdf.embedFont(fontBytes);
  } else {
    font = await pdf.embedFont('Helvetica');
  }

  let color = rgb(0.5, 0.5, 0.5);
  if (options.color) {
    if (options.color === 'red') color = rgb(1, 0, 0);
    if (options.color === 'blue') color = rgb(0, 0, 1);
    if (options.color === 'green') color = rgb(0, 1, 0);
    if (options.color === 'black') color = rgb(0, 0, 0);
  }

  for (const page of pages) {
    const { width, height } = page.getSize();

    if (options.position === 'diagonal') {
      // 对角线水印 - 放置在页面中心
      page.drawText(options.text, {
        x: width / 2 - (options.text.length * fontSize) / 4,
        y: height / 2,
        size: fontSize,
        font,
        opacity,
        color,
      });
    } else if (options.position === 'center') {
      page.drawText(options.text, {
        x: width / 2 - (options.text.length * fontSize) / 4,
        y: height / 2,
        size: fontSize,
        font,
        opacity,
        color,
      });
    } else if (options.position === 'tile') {
      for (let x = 0; x < width; x += 200) {
        for (let y = 0; y < height; y += 200) {
          page.drawText(options.text, {
            x,
            y,
            size: fontSize / 2,
            font,
            opacity: opacity / 2,
            color,
          });
        }
      }
    }
  }

  return pdf.save();
}
