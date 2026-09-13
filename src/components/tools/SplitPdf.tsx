import React, { useState } from 'react';
import { FileText, Download, CheckSquare, Square, RefreshCw, Scissors, Eye, Check, Trash2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolConfig, ProcessingState, PdfPagePreview } from '../../types';
import { FileDropzone } from '../common/FileDropzone';
import { ProcessingProgress } from '../common/ProcessingProgress';
import { formatFileSize, downloadBlob } from '../../lib/formatUtils';
import { renderPdfThumbnails, extractPdfPages } from '../../lib/pdfManager';
import { useLanguage } from '../../i18n/LanguageContext';

interface SplitPdfProps {
  toolConfig: ToolConfig;
}

export const SplitPdf: React.FC<SplitPdfProps> = ({ toolConfig }) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [splitMode, setSplitMode] = useState<'extract' | 'remove'>('extract');
  const [rangeInput, setRangeInput] = useState<string>('');
  const [previewPageNumber, setPreviewPageNumber] = useState<number | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    statusMessage: '',
  });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setResultBlob(null);
    setSelectedPages(new Set());
    setProcessingState({
      isProcessing: true,
      progress: 20,
      statusMessage: 'Rendering page thumbnails with pdf.js...',
    });

    try {
      const renderedPages = await renderPdfThumbnails(selectedFile, 0.45, (curr, total) => {
        const pct = Math.floor(20 + (curr / total) * 75);
        setProcessingState((prev) => ({
          ...prev,
          progress: pct,
          statusMessage: `Rendering page thumbnail ${curr} of ${total}...`,
        }));
      });

      setPages(renderedPages);
      // Default to selecting page 1
      setSelectedPages(new Set([1]));
      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: `Loaded ${renderedPages.length} pages`,
      });
    } catch (err: unknown) {
      // Fallback: If pdf.js rendering fails in sandboxed iframe, create placeholder page previews
      try {
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuf = await selectedFile.arrayBuffer();
        const doc = await PDFDocument.load(arrayBuf);
        const count = doc.getPageCount();

        const fallbackPreviews: PdfPagePreview[] = [];
        for (let i = 1; i <= count; i++) {
          fallbackPreviews.push({
            pageNumber: i,
            dataUrl: '',
            width: 200,
            height: 260,
          });
        }
        setPages(fallbackPreviews);
        setSelectedPages(new Set([1]));
        setProcessingState({
          isProcessing: false,
          progress: 100,
          statusMessage: `Loaded ${count} pages`,
        });
      } catch (innerErr: unknown) {
        const msg = innerErr instanceof Error ? innerErr.message : 'Failed to parse PDF document';
        setProcessingState({
          isProcessing: false,
          progress: 0,
          statusMessage: '',
          error: msg,
        });
      }
    }
  };

  const togglePageSelection = (pageNum: number) => {
    const updated = new Set(selectedPages);
    if (updated.has(pageNum)) {
      updated.delete(pageNum);
    } else {
      updated.add(pageNum);
    }
    setSelectedPages(updated);
  };

  const selectAll = () => {
    const all = new Set<number>();
    pages.forEach((p) => all.add(p.pageNumber));
    setSelectedPages(all);
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
  };

  const invertSelection = () => {
    const inverted = new Set<number>();
    pages.forEach((p) => {
      if (!selectedPages.has(p.pageNumber)) {
        inverted.add(p.pageNumber);
      }
    });
    setSelectedPages(inverted);
  };

  const applyRangeString = () => {
    if (!rangeInput.trim()) return;
    const newSelected = new Set<number>();
    const tokens = rangeInput.split(',');

    tokens.forEach((token) => {
      const trimmed = token.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const s = parseInt(startStr, 10);
        const e = parseInt(endStr, 10);
        if (!isNaN(s) && !isNaN(e)) {
          for (let p = Math.min(s, e); p <= Math.max(s, e); p++) {
            if (p >= 1 && p <= pages.length) newSelected.add(p);
          }
        }
      } else {
        const p = parseInt(trimmed, 10);
        if (!isNaN(p) && p >= 1 && p <= pages.length) {
          newSelected.add(p);
        }
      }
    });

    setSelectedPages(newSelected);
  };

  // Determine final page numbers to include
  const getPagesToInclude = (): number[] => {
    if (splitMode === 'extract') {
      return Array.from<number>(selectedPages).sort((a: number, b: number) => a - b);
    } else {
      // Remove selected
      return pages
        .map((p) => p.pageNumber)
        .filter((num) => !selectedPages.has(num))
        .sort((a, b) => a - b);
    }
  };

  const handleGeneratePdf = async () => {
    if (!file) return;
    const finalPages = getPagesToInclude();

    if (finalPages.length === 0) {
      alert('Please select at least one page to export.');
      return;
    }

    setProcessingState({
      isProcessing: true,
      progress: 30,
      statusMessage: 'Extracting selected page dictionaries with pdf-lib...',
    });

    try {
      const newPdfBytes = await extractPdfPages(file, finalPages);
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      setResultBlob(blob);

      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: `Extracted ${finalPages.length} pages successfully!`,
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to split PDF';
      setProcessingState({
        isProcessing: false,
        progress: 0,
        statusMessage: '',
        error: msg,
      });
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const originalBase = file.name.substring(0, file.name.lastIndexOf('.')) || 'document';
    const filename = `${originalBase}-split.pdf`;
    downloadBlob(resultBlob, filename);
  };

  const resetAll = () => {
    setFile(null);
    setPages([]);
    setSelectedPages(new Set());
    setResultBlob(null);
    setProcessingState({ isProcessing: false, progress: 0, statusMessage: '' });
  };

  const finalPagesCount = getPagesToInclude().length;

  return (
    <div className="w-full">
      {!file ? (
        <FileDropzone
          toolConfig={toolConfig}
          onFileSelected={handleFileSelected}
          sampleFileType="pdf"
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span>Size: {formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>Total Pages: {pages.length}</span>
                </div>
              </div>
            </div>

            <button
              id="change-pdf-file-btn"
              onClick={resetAll}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Choose Another File</span>
            </button>
          </div>

          {/* Mode Switcher & Selection Toolbar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Split Mode Radio */}
              <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-xs">
                <button
                  type="button"
                  id="mode-extract-btn"
                  onClick={() => setSplitMode('extract')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    splitMode === 'extract'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Extract Selected Pages
                </button>
                <button
                  type="button"
                  id="mode-remove-btn"
                  onClick={() => setSplitMode('remove')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    splitMode === 'remove'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Remove Selected Pages
                </button>
              </div>

              {/* Quick Select Buttons */}
              <div className="flex items-center space-x-2 text-xs">
                <button
                  type="button"
                  id="select-all-pages-btn"
                  onClick={selectAll}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-medium"
                >
                  Select All
                </button>
                <button
                  type="button"
                  id="clear-all-pages-btn"
                  onClick={deselectAll}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-medium"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  id="invert-pages-btn"
                  onClick={invertSelection}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-medium"
                >
                  Invert
                </button>
              </div>
            </div>

            {/* Page Range Syntax Input */}
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                Range Syntax:
              </span>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5, 7"
                className="flex-1 max-w-xs bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={applyRangeString}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors"
              >
                Apply Range
              </button>
              <span className="text-[11px] text-slate-400 pl-2">
                Selected: <strong className="text-slate-700">{selectedPages.size}</strong> of {pages.length}
              </span>
            </div>
          </div>

          {/* Page Thumbnails Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Click any page card to toggle selection</span>
              <span>
                Final document will contain: <strong className="text-slate-800 font-bold">{finalPagesCount} pages</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
              {pages.map((pg) => {
                const isSelected = selectedPages.has(pg.pageNumber);
                const willBeIncluded = splitMode === 'extract' ? isSelected : !isSelected;

                return (
                  <div
                    key={pg.pageNumber}
                    onClick={() => togglePageSelection(pg.pageNumber)}
                    className={`group relative rounded-xl p-2 cursor-pointer transition-all duration-150 border-2 bg-white flex flex-col items-center ${
                      isSelected
                        ? splitMode === 'extract'
                          ? 'border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                          : 'border-rose-400 bg-rose-50/30'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Checkbox / Selection Indicator Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors ${
                          isSelected
                            ? splitMode === 'extract'
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-white/90 border border-slate-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    {/* Quick Preview Eye */}
                    {pg.dataUrl && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPageNumber(pg.pageNumber);
                        }}
                        className="absolute top-3 right-3 z-10 w-6 h-6 rounded bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Enlarge Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Thumbnail Render / Placeholder */}
                    <div className="w-full aspect-[3/4] bg-white rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden mb-2 relative">
                      {pg.dataUrl ? (
                        <img
                          src={pg.dataUrl}
                          alt={`Page ${pg.pageNumber}`}
                          className="w-full h-full object-contain pointer-events-none"
                        />
                      ) : (
                        <div className="text-center p-3 text-slate-400">
                          <FileText className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                          <span className="text-[10px] font-mono">Page Preview</span>
                        </div>
                      )}

                      {!willBeIncluded && (
                        <div className="absolute inset-0 bg-slate-200/70 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded shadow-xs">
                            Excluded
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Page Label */}
                    <div className="flex items-center justify-between w-full px-1 text-xs">
                      <span className="font-bold text-slate-700">Page {pg.pageNumber}</span>
                      <span className={`text-[10px] font-semibold ${willBeIncluded ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {willBeIncluded ? 'Keep' : 'Skip'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Processing Progress */}
          <ProcessingProgress
            state={processingState}
            title="Splitting PDF in browser..."
          />

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Output PDF will contain <strong className="text-slate-800 font-bold">{finalPagesCount}</strong> pages
            </div>

            <div className="flex items-center space-x-3">
              {resultBlob ? (
                <>
                  <button
                    type="button"
                    onClick={() => setResultBlob(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Modify Selection
                  </button>
                  <button
                    type="button"
                    id="download-split-pdf-btn"
                    onClick={handleDownload}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('download')} ({formatFileSize(resultBlob.size)})</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  id="start-split-pdf-btn"
                  disabled={processingState.isProcessing || finalPagesCount === 0}
                  onClick={handleGeneratePdf}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm shadow-amber-600/20 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>{t('extractPages')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Enlarge Page Modal */}
          {previewPageNumber !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
              onClick={() => setPreviewPageNumber(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-lg w-full p-4 space-y-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-800">
                    Page {previewPageNumber} Inspection
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewPageNumber(null)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Close (Esc)
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-slate-100 rounded-xl p-2">
                  <img
                    src={pages.find((p) => p.pageNumber === previewPageNumber)?.dataUrl}
                    alt={`Enlarged page ${previewPageNumber}`}
                    className="max-h-full object-contain rounded shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
