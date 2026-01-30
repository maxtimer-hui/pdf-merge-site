'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { compressPDF, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface ToolSectionProps {
  locale: string;
}

export default function ToolSection({ locale }: ToolSectionProps) {
  const t = useTranslations('compress');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<{
    bytes: Uint8Array;
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      alert(tc('alertSelectPDF'));
      return;
    }

    setFile(selectedFile);
    setResult(null);
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
      console.error('Compress failed:', error);
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
    <>
      {/* 上传区域 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors">
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
          <div className="space-y-4">
            {/* 文件信息 */}
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

            {!result && (
              <button
                onClick={handleCompress}
                disabled={compressing}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {compressing ? tc('processing') : t('startCompress')}
              </button>
            )}
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {t('download')}
          </button>
        </div>
      )}
    </>
  );
}
