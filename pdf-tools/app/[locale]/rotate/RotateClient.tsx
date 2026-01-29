'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { rotatePDF, formatFileSize, downloadPDF } from '@/lib/pdf-utils';
import { getToolFAQs } from '@/lib/schema-faq';

interface PageRotation {
  page: number;
  degrees: number;
}

export default function RotateClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('rotate');
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rotations, setRotations] = useState<PageRotation[]>([]);
  const [rotateAll, setRotateAll] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      alert(t('alertSelectPDF'));
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setRotations([]);
    setRotateAll(0);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } catch (error) {
      console.error(t('readPDFFailed'), error);
    }
  };

  const handleRotatePage = (pageNum: number, degrees: number) => {
    setRotations(prev => {
      const existing = prev.findIndex(r => r.page === pageNum);
      if (existing >= 0) {
        const newRotations = [...prev];
        newRotations[existing].degrees += degrees;
        return newRotations;
      }
      return [...prev, { page: pageNum, degrees }];
    });
    setResult(null);
  };

  const handleRotateAll = (degrees: number) => {
    setRotateAll(prev => prev + degrees);
    setResult(null);
  };

  const handleRotate = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const allRotations: PageRotation[] = [];
      if (rotateAll !== 0) {
        for (let i = 1; i <= totalPages; i++) {
          allRotations.push({ page: i, degrees: rotateAll });
        }
      }
      for (const rotation of rotations) {
        allRotations.push(rotation);
      }
      if (allRotations.length === 0) {
        alert(t('alertSelectAngle'));
        return;
      }
      const pdfBytes = await rotatePDF(file, allRotations);
      setResult(pdfBytes);
    } catch (error) {
      console.error('旋转失败:', error);
      alert(t('alertRotateFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_rotated.pdf');
    downloadPDF(result, filename);
  };

  const resetRotation = () => {
    setRotations([]);
    setRotateAll(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToHome')}
          </Link>
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🔄</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            {!file ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">{t('uploadFile')}</p>
                  <p className="text-gray-500">{t('dragDrop')}</p>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">📄</div>
                    <div>
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {totalPages} {t('pages')}</p>
                    </div>
                  </div>
                  <button onClick={() => { setFile(null); setResult(null); setRotations([]); setRotateAll(0); }} className="text-red-500 hover:text-red-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-3">{t('rotateAll')}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleRotateAll(-90)} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">↶ -90°</button>
                    <button onClick={() => handleRotateAll(90)} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">↷ +90°</button>
                    <button onClick={() => handleRotateAll(180)} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">⟲ 180°</button>
                    <span className="ml-auto px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">{t('current')}: {rotateAll}°</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t('rotateIndividually')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                      const rotation = rotations.find(r => r.page === pageNum);
                      const totalDegrees = (rotation?.degrees || 0) + rotateAll;
                      return (
                        <div key={pageNum} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm">{t('page')} {pageNum}</span>
                          <div className="flex gap-1">
                            <button onClick={() => handleRotatePage(pageNum, -90)} className="px-2 py-1 text-sm bg-white rounded hover:bg-gray-100">↶</button>
                            <button onClick={() => handleRotatePage(pageNum, 90)} className="px-2 py-1 text-sm bg-white rounded hover:bg-gray-100">↷</button>
                            {totalDegrees !== 0 && <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">{totalDegrees}°</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {!result && (
                  <div className="flex gap-3">
                    <button onClick={handleRotate} disabled={processing} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {processing ? t('processing') : t('applyRotation')}
                    </button>
                    <button onClick={resetRotation} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">{t('reset')}</button>
                  </div>
                )}
              </div>
            )}
          </div>
          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('rotateComplete')}</h2>
                <p className="text-gray-600">{t('rotateSuccessDesc')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handleDownload} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">{t('download')}</button>
                <button onClick={resetRotation} className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">{t('rotateAgain')}</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <FAQ faqs={getToolFAQs('rotate', locale)} />

      <Footer />
    </div>
  );
}
