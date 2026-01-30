'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { addWatermark, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface ToolSectionProps {
  locale: string;
}

export default function ToolSection({ locale }: ToolSectionProps) {
  const t = useTranslations('watermark');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('Confidential');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(50);
  const [color, setColor] = useState('gray');
  const [position, setPosition] = useState<'diagonal' | 'center' | 'tile'>('diagonal');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      alert(tc('alertSelectPDF'));
      return;
    }
    setFile(selectedFile);
    setResult(null);
  };

  const handleAddWatermark = async () => {
    if (!file) return;
    if (!watermarkText.trim()) {
      alert(t('enterWatermarkText'));
      return;
    }

    setProcessing(true);
    try {
      const pdfBytes = await addWatermark(file, {
        text: watermarkText,
        opacity,
        fontSize,
        color,
        position,
      });
      setResult(pdfBytes);
    } catch (error) {
      console.error('Add watermark failed:', error);
      alert(t('addWatermarkFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_watermarked.pdf');
    downloadPDF(result, filename);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <>
      {/* Upload area */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-cyan-500 transition-colors">
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
            {/* File display */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="text-4xl mr-4">📄</div>
                <div>
                  <p className="font-semibold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setResult(null); }}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Watermark controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('watermarkText')}
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => { setWatermarkText(e.target.value); setResult(null); }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder={t('watermarkTextPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('opacity')}: {opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => { setOpacity(Number(e.target.value)); setResult(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fontSize')}: {fontSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={fontSize}
                  onChange={(e) => { setFontSize(Number(e.target.value)); setResult(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('color')}
                </label>
                <div className="flex gap-3">
                  {['gray', 'black', 'red', 'blue', 'green'].map((c) => (
                    <button
                      key={c}
                      onClick={() => { setColor(c); setResult(null); }}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        color === c
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                    >
                      <span
                        className={`inline-block w-6 h-6 rounded ${
                          c === 'gray' ? 'bg-gray-500' :
                          c === 'black' ? 'bg-black' :
                          c === 'red' ? 'bg-red-500' :
                          c === 'blue' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('position')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => { setPosition('diagonal'); setResult(null); }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      position === 'diagonal'
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">📐</div>
                    <div className="text-sm font-medium">{t('diagonal')}</div>
                  </button>
                  <button
                    onClick={() => { setPosition('center'); setResult(null); }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      position === 'center'
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-sm font-medium">{t('center')}</div>
                  </button>
                  <button
                    onClick={() => { setPosition('tile'); setResult(null); }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      position === 'tile'
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🔲</div>
                    <div className="text-sm font-medium">{t('tile')}</div>
                  </button>
                </div>
              </div>
            </div>

            {!result && (
              <button
                onClick={handleAddWatermark}
                disabled={processing}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {processing ? tc('processing') : t('addWatermark')}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Result display */}
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('watermarkAdded')}</h2>
            <p className="text-gray-600">{t('watermarkAddedDesc')}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {tc('download')}
            </button>
            <button
              onClick={handleReset}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t('adjustSettings')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
