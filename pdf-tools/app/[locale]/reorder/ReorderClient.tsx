'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { reorderPages, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

export default function ReorderClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('reorder');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      alert(tc('alertSelectPDF'));
      return;
    }
    setFile(selectedFile);
    setResult(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setTotalPages(count);
      setPageOrder(Array.from({ length: count }, (_, i) => i + 1));
    } catch (error) {
      console.error(tc('readPDFFailed'), error);
      alert(tc('alertFailed'));
    }
  };

  const movePage = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= pageOrder.length) return;

    const newOrder = [...pageOrder];
    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    setPageOrder(newOrder);
    setResult(null);
  };

  const resetOrder = () => {
    setPageOrder(Array.from({ length: totalPages }, (_, i) => i + 1));
    setResult(null);
  };

  const reverseOrder = () => {
    setPageOrder([...pageOrder].reverse());
    setResult(null);
  };

  const shuffleOrder = () => {
    const newOrder = [...pageOrder];
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setPageOrder(newOrder);
    setResult(null);
  };

  const handleReorder = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdfBytes = await reorderPages(file, pageOrder);
      setResult(pdfBytes);
    } catch (error) {
      console.error('重新排序失败:', error);
      alert(tc('alertFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_reordered.pdf');
    downloadPDF(result, filename);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${locale}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tc('backToHome')}
          </Link>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              🔀
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('dragDropDesc')}</p>
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
                  <p className="text-xl font-semibold text-gray-700 mb-2">{tc('uploadFile')}</p>
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
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {totalPages} {tc('pages')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setFile(null); setResult(null); setPageOrder([]); }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">页面顺序（可调整）</h3>
                    <div className="flex gap-2">
                      <button onClick={resetOrder} className="text-sm text-blue-600 hover:text-blue-800">{tc('reset')}</button>
                      <button onClick={reverseOrder} className="text-sm text-purple-600 hover:text-purple-800">倒序</button>
                      <button onClick={shuffleOrder} className="text-sm text-orange-600 hover:text-orange-800">随机</button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto p-3 border border-gray-300 rounded-lg">
                    {pageOrder.map((pageNum, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-purple-600 w-8">#{index + 1}</span>
                          <span className="px-3 py-1 bg-purple-600 text-white rounded-lg font-semibold">
                            {tc('page')} {pageNum}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => movePage(index, 'up')}
                            disabled={index === 0}
                            className="px-3 py-1 text-sm bg-white rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => movePage(index, 'down')}
                            disabled={index === pageOrder.length - 1}
                            className="px-3 py-1 text-sm bg-white rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-600">
                    <p>💡 提示：新页面顺序: {pageOrder.join(' → ')}</p>
                  </div>
                </div>

                {!result && (
                  <button
                    onClick={handleReorder}
                    disabled={processing}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {processing ? tc('processing') : t('reorder')}
                  </button>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('reorderComplete')}</h2>
                <p className="text-gray-600">{t('reorderSuccessDesc')}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {tc('download')}
                </button>
                <button
                  onClick={resetOrder}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  {t('reorderAgain')}
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
