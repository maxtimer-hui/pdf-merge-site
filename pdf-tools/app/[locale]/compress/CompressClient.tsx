'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { compressPDF, formatFileSize, downloadPDF } from '@/lib/pdf-utils';
import { getToolFAQs } from '@/lib/schema-faq';

export default function CompressClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('compress');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<{
    bytes: Uint8Array;
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert(tc('alertSelectPDF'));
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setCompressing(true);
    try {
      const compressedResult = await compressPDF(file, {
        deleteUnused: true,
      });
      setResult(compressedResult);
    } catch (error) {
      console.error('压缩失败:', error);
      alert(t('compressFailed'));
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_compressed.pdf');
    downloadPDF(result.bytes, filename);
  };

  const calculateSavedPercentage = () => {
    if (!result) return 0;
    const saved = result.originalSize - result.compressedSize;
    return ((saved / result.originalSize) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
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
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              🗜️
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>

          {/* 上传区域 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            {!file ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    {t('upload')}
                  </p>
                  <p className="text-gray-500">{tc('dragDrop')}</p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">📄</div>
                    <div>
                      <p className="font-semibold text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {!result ? (
                  <button
                    onClick={handleCompress}
                    disabled={compressing}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {compressing ? t('processing') : t('startCompress')}
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* 压缩结果 */}
          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('success')}</h2>
                <p className="text-green-600 font-semibold">
                  {t('savedSpace', { percent: calculateSavedPercentage() })}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{t('originalSize')}</p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatFileSize(result.originalSize)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{t('compressedSize')}</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatFileSize(result.compressedSize)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{t('saved')}</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatFileSize(result.originalSize - result.compressedSize)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {t('download')}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <FAQ faqs={getToolFAQs('compress', locale)} />

      <Footer />
    </div>
  );
}
