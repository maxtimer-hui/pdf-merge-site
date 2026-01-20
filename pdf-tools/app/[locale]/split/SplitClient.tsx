'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { splitPDFByRange, splitPDFEvery, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface SplitResult {
  name: string;
  bytes: Uint8Array;
}

export default function SplitClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('split');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<'range' | 'every'>('range');
  const [pageRange, setPageRange] = useState('');
  const [everyNPages, setEveryNPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [results, setResults] = useState<SplitResult[]>([]);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      alert(tc('alertSelectPDF'));
      return;
    }

    setFile(selectedFile);
    setResults([]);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } catch (error) {
      console.error('读取 PDF 失败:', error);
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    setSplitting(true);
    try {
      let splitResults: SplitResult[] = [];

      if (splitMode === 'range') {
        if (!pageRange.trim()) {
          alert('请输入页面范围');
          return;
        }
        const ranges = pageRange.split(',').map(r => r.trim());
        splitResults = await splitPDFByRange(file, ranges);
      } else {
        if (everyNPages < 1) {
          alert('请输入有效的页数');
          return;
        }
        const pdfBytes = await splitPDFEvery(file, everyNPages);
        splitResults = pdfBytes.map((bytes, index) => ({
          name: file.name.replace('.pdf', '') + '_part_' + (index + 1) + '.pdf',
          bytes,
        }));
      }

      setResults(splitResults);
    } catch (error) {
      console.error('分割失败:', error);
      alert('分割失败，请重试');
    } finally {
      setSplitting(false);
    }
  };

  const handleDownload = (result: SplitResult) => {
    downloadPDF(result.bytes, result.name);
  };

  const handleDownloadAll = () => {
    results.forEach((result, index) => {
      setTimeout(() => downloadPDF(result.bytes, result.name), index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tc('backToHome')}
          </Link>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              ✂️
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            {!file ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">{t('upload')}</p>
                  <p className="text-gray-500">{tc('dragDrop')}</p>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">📄</div>
                    <div>
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {tc('pages', { count: totalPages })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setResults([]);
                      setPageRange('');
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('selectSplitMode')}</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSplitMode('range')}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        splitMode === 'range'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {t('splitCustom')}
                    </button>
                    <button
                      onClick={() => setSplitMode('every')}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        splitMode === 'every'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {t('splitEvenly')}
                    </button>
                  </div>
                </div>

                {splitMode === 'range' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('pageRangeLabel')}
                    </label>
                    <input
                      type="text"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="1-5, 8-10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {t('totalPagesInfo', { count: totalPages })}
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('every')} {everyNPages} {t('pagesIntoFile')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={everyNPages}
                      onChange={(e) => setEveryNPages(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {t('estimatedFiles', { count: Math.ceil(totalPages / everyNPages) })}
                    </p>
                  </div>
                )}

                {!results.length && (
                  <button
                    onClick={handleSplit}
                    disabled={splitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {splitting ? t('processing') : t('split')}
                  </button>
                )}
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('splitComplete')}</h2>
                <p className="text-gray-600">{t('splitSuccess', { count: results.length })}</p>
              </div>

              <div className="space-y-2 mb-6">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📄</div>
                      <div>
                        <p className="font-medium text-gray-800">{result.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(result.bytes.byteLength)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(result)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {tc('download')}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDownloadAll}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {tc('downloadAll')}
                </button>
                <button
                  onClick={() => {
                    setResults([]);
                    setPageRange('');
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  {tc('splitAgain')}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
