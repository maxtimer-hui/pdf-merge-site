'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { rotatePDF, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface PDFFile {
  file: File;
  id: string;
  rotations: { [key: number]: number }; // pageIndex -> degrees
}

interface ToolSectionProps {
  locale: string;
}

export default function ToolSection({ locale }: ToolSectionProps) {
  const t = useTranslations('rotate');
  const tc = useTranslations('common');
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [rotating, setRotating] = useState(false);
  const [rotatedPdf, setRotatedPdf] = useState<Uint8Array | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [rotationAngle, setRotationAngle] = useState<number>(90);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    if (file.type !== 'application/pdf') {
      alert(t('alertSelectPDF'));
      return;
    }

    setPdfFile({
      file,
      id: `${file.name}-${Date.now()}`,
      rotations: {},
    });
    setRotatedPdf(null);
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

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    handleFileSelect(files);
  };

  const handleRotate = async () => {
    if (!pdfFile) return;

    setRotating(true);
    try {
      const rotations = Object.entries(pdfFile.rotations).map(([page, degrees]) => ({
        page: parseInt(page),
        degrees: degrees as number,
      }));

      const pdfBytes = await rotatePDF(pdfFile.file, rotations);
      setRotatedPdf(pdfBytes);
    } catch (error) {
      console.error('Rotate failed:', error);
      alert(t('alertFailed'));
    } finally {
      setRotating(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedPdf) return;
    const filename = `rotated_${Date.now()}.pdf`;
    downloadPDF(rotatedPdf, filename);
  };

  const clearAll = () => {
    setPdfFile(null);
    setRotatedPdf(null);
  };

  const setRotationForPage = (pageIndex: number, degrees: number) => {
    if (!pdfFile) return;

    const newRotations = { ...pdfFile.rotations };
    if (degrees === 0) {
      delete newRotations[pageIndex];
    } else {
      newRotations[pageIndex] = degrees;
    }

    setPdfFile({
      ...pdfFile,
      rotations: newRotations,
    });
    setRotatedPdf(null);
  };

  const rotateAll = () => {
    if (!pdfFile) return;
    const rotations: { [key: number]: number } = {};
    // Assume typical PDF has reasonable number of pages
    for (let i = 0; i < 100; i++) {
      rotations[i] = rotationAngle;
    }
    setPdfFile({
      ...pdfFile,
      rotations,
    });
    setRotatedPdf(null);
  };

  return (
    <>
      {/* Upload area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white rounded-lg shadow-lg p-8 mb-6 border-2 border-dashed transition-colors ${
          dragOver ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
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
          <p className="text-gray-500">{tc('dragDrop')}</p>
        </label>
      </div>

      {/* Rotation controls */}
      {pdfFile && !rotatedPdf && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t('selectedFiles', { count: 1 })}
            </h2>
            <button
              onClick={clearAll}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              {tc('clearAll')}
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📄</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{pdfFile.file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(pdfFile.file.size)}</p>
              </div>
            </div>
          </div>

          {/* Global rotation angle selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('rotationAngle')}
            </label>
            <div className="flex gap-2">
              {[90, 180, 270].map((angle) => (
                <button
                  key={angle}
                  onClick={() => setRotationAngle(angle)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    rotationAngle === angle
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>

          {/* Apply rotation buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={rotateAll}
              className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {t('rotateAll')}
            </button>
            <button
              onClick={handleRotate}
              disabled={rotating || Object.keys(pdfFile.rotations).length === 0}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {rotating ? tc('processing') : t('applyRotation')}
            </button>
          </div>

          {/* Page rotation info */}
          {Object.keys(pdfFile.rotations).length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                {t('pagesToRotate', { count: Object.keys(pdfFile.rotations).length })}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Rotation result */}
      {rotatedPdf && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('success')}</h2>
            <p className="text-gray-600">{t('rotateSuccess')}</p>
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
              {tc('rotateMore')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
