'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { mergePDFs, splitPDFEvery, compressPDF, formatFileSize, downloadPDF } from '@/lib/pdf-utils';

interface BatchFile {
  file: File;
  id: string;
}

type BatchMode = 'merge' | 'split' | 'compress';

interface ToolSectionProps {
  locale: string;
}

export default function ToolSection({ locale }: ToolSectionProps) {
  const t = useTranslations('batch');
  const tc = useTranslations('common');
  const [mode, setMode] = useState<BatchMode>('merge');
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [splitOption, setSplitOption] = useState<number>(1);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(f => f.type === 'application/pdf');

    if (pdfFiles.length === 0) {
      alert(tc('alertSelectPDF'));
      return;
    }

    const newFiles: BatchFile[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
    }));

    setFiles(prev => [...prev, ...newFiles]);
    setResults([]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setResults([]);
  };

  const clearFiles = () => {
    setFiles([]);
    setResults([]);
  };

  const handleBatchMerge = async () => {
    if (files.length < 2) {
      alert(t('batchMergeMinFiles'));
      return;
    }

    setProcessing(true);
    setCurrentProgress(0);
    try {
      const mergedBytes = await mergePDFs(files.map(f => f.file));
      setResults([{
        name: 'merged.pdf',
        bytes: mergedBytes,
      }]);
      setCurrentProgress(100);
    } catch (error) {
      console.error('Batch merge failed:', error);
      alert(t('batchMergeFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleBatchSplit = async () => {
    if (files.length === 0) {
      alert(t('batchSplitSelectFiles'));
      return;
    }

    setProcessing(true);
    setCurrentProgress(0);
    try {
      const allResults: { name: string; bytes: Uint8Array }[] = [];

      for (let i = 0; i < files.length; i++) {
        const splitResults = await splitPDFEvery(files[i].file, splitOption);
        splitResults.forEach((bytes, index) => {
          allResults.push({
            name: `${files[i].file.name.replace('.pdf', '')}_part_${index + 1}.pdf`,
            bytes,
          });
        });
        setCurrentProgress(((i + 1) / files.length) * 100);
      }

      setResults(allResults);
    } catch (error) {
      console.error('Batch split failed:', error);
      alert(t('batchSplitFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleBatchCompress = async () => {
    if (files.length === 0) {
      alert(t('batchCompressSelectFiles'));
      return;
    }

    setProcessing(true);
    setCurrentProgress(0);
    try {
      const allResults: { name: string; bytes: Uint8Array }[] = [];

      for (let i = 0; i < files.length; i++) {
        const result = await compressPDF(files[i].file, { deleteUnused: true });
        allResults.push({
          name: files[i].file.name.replace('.pdf', '_compressed.pdf'),
          bytes: result.bytes,
        });
        setCurrentProgress(((i + 1) / files.length) * 100);
      }

      setResults(allResults);
    } catch (error) {
      console.error('Batch compression failed:', error);
      alert(t('batchCompressFailed'));
    } finally {
      setProcessing(false);
    }
  };

  const handleBatchProcess = () => {
    switch (mode) {
      case 'merge':
        handleBatchMerge();
        break;
      case 'split':
        handleBatchSplit();
        break;
      case 'compress':
        handleBatchCompress();
        break;
    }
  };

  const handleDownload = (result: { name: string; bytes: Uint8Array }) => {
    downloadPDF(result.bytes, result.name);
  };

  const handleDownloadAll = () => {
    results.forEach(result => {
      setTimeout(() => downloadPDF(result.bytes, result.name), 100);
    });
  };

  const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);

  return (
    <>
      {/* Mode Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">{t('selectBatchMode')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => { setMode('merge'); setResults([]); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'merge'
                ? 'border-violet-500 bg-violet-50'
                : 'border-gray-200 hover:border-violet-300'
            }`}
          >
            <div className="text-3xl mb-2">🔗</div>
            <div className="font-semibold">{t('batchMerge')}</div>
            <div className="text-sm text-gray-500">{t('batchMergeDesc')}</div>
          </button>

          <button
            onClick={() => { setMode('split'); setResults([]); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'split'
                ? 'border-violet-500 bg-violet-50'
                : 'border-gray-200 hover:border-violet-300'
            }`}
          >
            <div className="text-3xl mb-2">✂️</div>
            <div className="font-semibold">{t('batchSplit')}</div>
            <div className="text-sm text-gray-500">{t('batchSplitDesc')}</div>
          </button>

          <button
            onClick={() => { setMode('compress'); setResults([]); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === 'compress'
                ? 'border-violet-500 bg-violet-50'
                : 'border-gray-200 hover:border-violet-300'
            }`}
          >
            <div className="text-3xl mb-2">🗜️</div>
            <div className="font-semibold">{t('batchCompress')}</div>
            <div className="text-sm text-gray-500">{t('batchCompressDesc')}</div>
          </button>
        </div>
      </div>

      {/* Split Options */}
      {mode === 'split' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">{t('splitOptions')}</h3>
          <div className="flex gap-4 items-center">
            <label className="text-gray-700">{t('every')}</label>
            <select
              value={splitOption}
              onChange={(e) => setSplitOption(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <label className="text-gray-700">{t('pagesSplit')}</label>
          </div>
        </div>
      )}

      {/* File Upload Area */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors">
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="batch-file-upload"
          />
          <label htmlFor="batch-file-upload" className="cursor-pointer">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">{t('addFiles')}</p>
            <p className="text-gray-500">{t('clickSelectFiles')}</p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{tc('selectedFiles', { count: files.length })}</h3>
              <button onClick={clearFiles} className="text-red-600 hover:text-red-800 text-sm">
                {t('clearAll')}
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="text-2xl mr-3">📄</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{f.file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(f.file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(f.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-violet-50 rounded-lg text-sm">
              <p>{tc('totalFiles')}: {files.length} • {tc('totalSize')}: {formatFileSize(totalSize)}</p>
            </div>
          </div>
        )}

        {/* Process Button */}
        {files.length > 0 && !processing && results.length === 0 && (
          <button
            onClick={handleBatchProcess}
            className="w-full mt-6 bg-gradient-to-r from-violet-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-violet-600 hover:to-purple-600 transition-all"
          >
            {t('startBatchProcess')}
          </button>
        )}

        {/* Progress Bar */}
        {processing && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{tc('processing')}</span>
              <span>{Math.round(currentProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Processing Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('batchProcessComplete')}</h2>
            <p className="text-gray-600">{t('generatedFiles', { count: results.length })}</p>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="text-2xl mr-3">✓</div>
                  <p className="font-medium text-gray-800 truncate">{result.name}</p>
                </div>
                <button
                  onClick={() => handleDownload(result)}
                  className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
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
              {t('downloadAll')}
            </button>
            <button
              onClick={() => { setResults([]); setCurrentProgress(0); }}
              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {tc('processAgain')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
