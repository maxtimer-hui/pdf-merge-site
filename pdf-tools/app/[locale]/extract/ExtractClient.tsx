'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { extractPages, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

export default function ExtractClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('extract');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [extractMode, setExtractMode] = useState<'range' | 'specific' | 'all' | 'even' | 'odd'>('range');
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      alert(tc('alertSelectPDF'));
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setSelectedPages([]);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } catch (error) {
      console.error('读取 PDF 失败:', error);
    }
  };

  const getPagesToExtract = (): number[] => {
    switch (extractMode) {
      case 'all':
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      case 'even':
        return Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => n % 2 === 0);
      case 'odd':
        return Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => n % 2 === 1);
      case 'specific':
        return selectedPages;
      case 'range':
      default:
        if (!pageRange.trim()) return [];
        const pages: number[] = [];
        const parts = pageRange.split(',');
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
  };

  const handleExtract = async () => {
    if (!file) return;

    const pages = getPagesToExtract();
    if (pages.length === 0) {
      alert(t('selectPagesToExtract'));
      return;
    }

    setExtracting(true);
    try {
      const pdfBytes = await extractPages(file, pages);
      setResult(pdfBytes);
    } catch (error) {
      console.error('提取失败:', error);
      alert('提取失败，请重试');
    } finally {
      setExtracting(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_extracted.pdf');
    downloadPDF(result, filename);
  };

  const togglePageSelection = (pageNum: number) => {
    setSelectedPages(prev =>
      prev.includes(pageNum)
        ? prev.filter(p => p !== pageNum)
        : [...prev, pageNum].sort((a, b) => a - b)
    );
  };

  const selectAllPages = () => {
    setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));
  };

  const clearPageSelection = () => {
    setSelectedPages([]);
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
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              📄
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
                        {formatFileSize(file.size)} • {totalPages} 页
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                      setSelectedPages([]);
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
                  <h3 className="text-lg font-semibold mb-3">选择提取模式</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setExtractMode('range')}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                        extractMode === 'range'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      页面范围
                    </button>
                    <button
                      onClick={() => setExtractMode('specific')}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                        extractMode === 'specific'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      选择页面
                    </button>
                    <button
                      onClick={() => setExtractMode('all')}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                        extractMode === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      全部页面
                    </button>
                    <button
                      onClick={() => setExtractMode('even')}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                        extractMode === 'even'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      偶数页
                    </button>
                    <button
                      onClick={() => setExtractMode('odd')}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                        extractMode === 'odd'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      奇数页
                    </button>
                  </div>
                </div>

                {extractMode === 'range' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      页面范围（例如：1-3,5,7-9）
                    </label>
                    <input
                      type="text"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="1-5, 8-10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      共 {totalPages} 页，使用逗号分隔多个范围
                    </p>
                  </div>
                )}

                {extractMode === 'specific' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('selectPagesToExtract')}
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={selectAllPages}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          全选
                        </button>
                        <button
                          onClick={clearPageSelection}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          清空
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => togglePageSelection(pageNum)}
                          className={`p-2 text-sm rounded transition-colors ${
                            selectedPages.includes(pageNum)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('selectedPages', { count: selectedPages.length })}
                    </p>
                  </div>
                )}

                {(extractMode === 'all' || extractMode === 'even' || extractMode === 'odd') && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {extractMode === 'all' && `将提取全部 ${totalPages} 页`}
                      {extractMode === 'even' && `将提取 ${Math.floor(totalPages / 2)} 个偶数页`}
                      {extractMode === 'odd' && `将提取 ${Math.ceil(totalPages / 2)} 个奇数页`}
                    </p>
                  </div>
                )}

                {!result && (
                  <button
                    onClick={handleExtract}
                    disabled={extracting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {extracting ? t('processing') : t('startExtract')}
                  </button>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('extractComplete')}</h2>
                <p className="text-gray-600">{t('extractSuccess', { count: selectedPages.length })}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {t('download')}
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setSelectedPages([]);
                    setPageRange('');
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  {tc('extractAgain')}
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
