'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { deletePages, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface ToolSectionProps {
  locale: string;
}

export default function ToolSection({ locale }: ToolSectionProps) {
  const t = useTranslations('deletePages');
  const tc = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [dragOver, setDragOver] = useState(false);

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
      console.error('Failed to read PDF:', error);
      alert(tc('readPDFFailed'));
    }
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

    const droppedFile = Array.from(e.dataTransfer.files).find(
      file => file.type === 'application/pdf'
    );

    if (!droppedFile) {
      alert(tc('alertSelectPDF'));
      return;
    }

    handleFileChange(droppedFile);
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

  const handleDelete = async () => {
    if (!file) return;
    if (selectedPages.length === 0) {
      alert(t('selectPagesAlert'));
      return;
    }
    if (selectedPages.length === totalPages) {
      alert(t('cannotDeleteAll'));
      return;
    }
    setProcessing(true);
    try {
      const pdfBytes = await deletePages(file, selectedPages);
      setResult(pdfBytes);
    } catch (error) {
      console.error('Deletion failed:', error);
      alert(t('deleteFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = file.name.replace('.pdf', '_deleted.pdf');
    downloadPDF(result, filename);
  };

  const resetSelection = () => {
    setSelectedPages([]);
    setResult(null);
  };

  return (
    <>
      {/* Upload Area */}
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white rounded-lg shadow-lg p-8 mb-6 border-2 border-dashed transition-colors ${
            dragOver ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block text-center"
          >
            <div className="text-6xl mb-4">📄</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {tc('uploadFile')}
            </p>
            <p className="text-gray-500">{tc('dragDrop')}</p>
          </label>
        </div>
      )}

      {/* File Selection and Page Selection */}
      {file && !result && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📄</div>
              <div>
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)} • {totalPages} {tc('pages')}</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setResult(null); setSelectedPages([]); }}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{t('selectPagesToDelete')}</h3>
              <div className="flex gap-2">
                <button onClick={selectAllPages} className="text-sm text-red-600 hover:text-red-800">
                  {tc('selectAll')}
                </button>
                <button onClick={clearPageSelection} className="text-sm text-red-600 hover:text-red-800">
                  {tc('clear')}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-2 max-h-64 overflow-y-auto p-3 border border-gray-300 rounded-lg">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => togglePageSelection(pageNum)}
                  className={`p-3 text-sm rounded transition-colors ${
                    selectedPages.includes(pageNum)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t('selectedWillDelete', { selected: selectedPages.length, remaining: totalPages - selectedPages.length })}
            </p>
          </div>

          <button
            onClick={handleDelete}
            disabled={processing || selectedPages.length === 0}
            className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {processing ? tc('processing') : t('deleteSelected')}
          </button>
        </div>
      )}

      {/* Success Result */}
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('deleteComplete')}</h2>
            <p className="text-gray-600">{t('deleteCompleteDesc', { deleted: selectedPages.length, remaining: totalPages - selectedPages.length })}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {tc('download')}
            </button>
            <button
              onClick={resetSelection}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t('deleteAgain')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
