'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { mergePDFs, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface PDFFile {
  file: File;
  id: string;
}

interface HowToData {
  name: string;
  steps: Array<{name: string; text: string}>;
}

export default function MergeClient({
  params,
  howToData,
}: {
  params: Promise<{ locale: string }>;
  howToData: HowToData;
}) {
  const { locale } = use(params);
  const t = useTranslations('merge');
  const tc = useTranslations('common');
  const [files, setFiles] = useState<PDFFile[]>([]);

  const breadcrumbItems = [
    {name: 'Home', href: ''},
    {name: 'Merge PDF', href: '/merge'},
  ];
  const [merging, setMerging] = useState(false);
  const [mergedPdf, setMergedPdf] = useState<Uint8Array | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: PDFFile[] = Array.from(selectedFiles)
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
      }));

    if (newFiles.length === 0) {
      alert(t('alertSelectPDF'));
      return;
    }

    setFiles(prev => [...prev, ...newFiles]);
    setMergedPdf(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );

    if (droppedFiles.length === 0) {
      alert(t('alertSelectPDF'));
      return;
    }

    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setMergedPdf(null);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
    setMergedPdf(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert(t('alertMinTwo'));
      return;
    }

    setMerging(true);
    try {
      const pdfBytes = await mergePDFs(files.map(f => f.file));
      setMergedPdf(pdfBytes);
    } catch (error) {
      console.error('合并失败:', error);
      alert(t('alertFailed'));
    } finally {
      setMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdf) return;
    const filename = `merged_${Date.now()}.pdf`;
    downloadPDF(mergedPdf, filename);
  };

  const clearAll = () => {
    setFiles([]);
    setMergedPdf(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} locale={locale} />

          {/* {tc('backToHome')}链接 */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tc('backToHome')}
          </Link>

          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              🔗
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>

          {/* 上传区域 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-white rounded-lg shadow-lg p-8 mb-6 border-2 border-dashed transition-colors ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer block text-center"
            >
              <div className="text-6xl mb-4">📄</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {t('upload')}
              </p>
              <p className="text-gray-500">{tc('dragDrop')} {tc('supportsMultiple')}</p>
            </label>
          </div>

          {/* 文件列表 */}
          {files.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {t('selectedFiles', { count: files.length })}
                </h2>
                <button
                  onClick={clearAll}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  {tc('clearAll')}
                </button>
              </div>

              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">📄</div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{file.file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.file.size)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {index > 0 && (
                        <button
                          onClick={() => moveFile(index, index - 1)}
                          className="p-2 hover:bg-gray-200 rounded"
                          title={tc('moveUp')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      )}

                      {index < files.length - 1 && (
                        <button
                          onClick={() => moveFile(index, index + 1)}
                          className="p-2 hover:bg-gray-200 rounded"
                          title={tc('moveDown')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}

                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        title={tc('remove')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!mergedPdf && (
                <button
                  onClick={handleMerge}
                  disabled={merging || files.length < 2}
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {merging ? tc('processing') : t('startMerge')}
                </button>
              )}
            </div>
          )}

          {/* 合并结果 */}
          {mergedPdf && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('success')}</h2>
                <p className="text-gray-600">{t('mergeSuccess', { count: files.length })}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {t('download')}
                </button>
                <button
                  onClick={clearAll}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  {tc('mergeMore')}
                </button>
              </div>
            </div>
          )}

          {/* How-to Section */}
          <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {howToData.name}
            </h2>
            <ol className="space-y-4">
              {howToData.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.name}</h3>
                    <p className="text-gray-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  How to combine PDF files free?
                </summary>
                <p className="mt-2 text-gray-600">
                  Upload your PDF files, arrange them in desired order, and click 'Combine PDF'. Your merged PDF will be ready instantly.
                </p>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a limit on how many PDFs I can combine?
                </summary>
                <p className="mt-2 text-gray-600">
                  No, you can combine unlimited PDF files. There's no restriction on the number or size of files.
                </p>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Can I combine password-protected PDFs?
                </summary>
                <p className="mt-2 text-gray-600">
                  Yes, but you'll need to remove the password first using our Decrypt PDF tool.
                </p>
              </details>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
