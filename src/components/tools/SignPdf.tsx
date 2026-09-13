import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Download, AlertTriangle, RefreshCw, Trash2, Check, Sparkles, Move, Type, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolConfig, ProcessingState, PlacedSignature } from '../../types';
import { FileDropzone } from '../common/FileDropzone';
import { ProcessingProgress } from '../common/ProcessingProgress';
import { formatFileSize, downloadBlob } from '../../lib/formatUtils';
import { renderPdfSinglePage, embedSignaturesIntoPdf } from '../../lib/pdfManager';
import { useLanguage } from '../../i18n/LanguageContext';

interface SignPdfProps {
  toolConfig: ToolConfig;
}

export const SignPdf: React.FC<SignPdfProps> = ({ toolConfig }) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageRenderData, setPageRenderData] = useState<{
    dataUrl: string;
    width: number;
    height: number;
  } | null>(null);

  // Placed signatures across pages
  const [placedSignatures, setPlacedSignatures] = useState<PlacedSignature[]>([]);
  const [activeSignatureId, setActiveSignatureId] = useState<string | null>(null);

  // Modal for signature creation
  const [showSignatureModal, setShowSignatureModal] = useState<boolean>(false);
  const [sigMode, setSigMode] = useState<'draw' | 'type' | 'upload'>('draw');

  // Drawing state
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('#0f172a');
  const [penWidth, setPenWidth] = useState<number>(3);

  // Type signature state
  const [typedName, setTypedName] = useState<string>('John Doe');
  const [typedFont, setTypedFont] = useState<string>('cursive');

  // Dragging & Resizing placed signature on page
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingSig, setIsDraggingSig] = useState<boolean>(false);
  const [dragStartOffset, setDragStartOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    statusMessage: '',
  });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  // Load PDF single page when file or page changes
  const loadPage = async (docFile: File, pageNum: number) => {
    try {
      const rendered = await renderPdfSinglePage(docFile, pageNum, 1.2);
      setPageRenderData(rendered);
    } catch {
      // Fallback blank canvas if pdfjs worker restricted
      setPageRenderData({
        dataUrl: '',
        width: 600,
        height: 800,
      });
    }
  };

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setResultBlob(null);
    setPlacedSignatures([]);
    setActiveSignatureId(null);
    setProcessingState({
      isProcessing: true,
      progress: 25,
      statusMessage: 'Loading document structure with pdf-lib...',
    });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const buf = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const count = doc.getPageCount();
      setTotalPages(count);
      setCurrentPage(1);

      await loadPage(selectedFile, 1);

      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: `Loaded ${count} page document`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load PDF';
      setProcessingState({
        isProcessing: false,
        progress: 0,
        statusMessage: '',
        error: msg,
      });
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (!file || newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    await loadPage(file, newPage);
  };

  // Drawing pad handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const drawStroke = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearDrawingCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Generate PNG dataUrl from typed signature
  const createTypedSignatureDataUrl = (text: string, font: string, color: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 160;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.font = `italic 54px ${font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
  };

  // Upload image signature with white background transparent filter
  const handleSignatureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const imgFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        // Convert light pixels (paper) to transparent
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // If close to white, make transparent
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);

        placeSignatureOnCurrentPage(canvas.toDataURL('image/png'));
        setShowSignatureModal(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(imgFile);
  };

  const placeSignatureOnCurrentPage = (dataUrl: string) => {
    const newSig: PlacedSignature = {
      id: `sig-${Date.now()}`,
      pageNumber: currentPage,
      dataUrl,
      xPercent: 35,
      yPercent: 75,
      widthPercent: 28,
      heightPercent: 12,
      aspectRatio: 2.5,
    };

    setPlacedSignatures((prev) => [...prev, newSig]);
    setActiveSignatureId(newSig.id);
  };

  const handleApplySignatureModal = () => {
    let sigDataUrl = '';
    if (sigMode === 'draw') {
      if (!sigCanvasRef.current) return;
      sigDataUrl = sigCanvasRef.current.toDataURL('image/png');
    } else if (sigMode === 'type') {
      sigDataUrl = createTypedSignatureDataUrl(typedName, typedFont, penColor);
    }

    if (sigDataUrl) {
      placeSignatureOnCurrentPage(sigDataUrl);
    }
    setShowSignatureModal(false);
  };

  // Dragging placement handlers
  const handleSigMouseDown = (e: React.MouseEvent, sig: PlacedSignature) => {
    e.stopPropagation();
    setActiveSignatureId(sig.id);
    setIsDraggingSig(true);

    if (!pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setDragStartOffset({
      x: mouseX - sig.xPercent,
      y: mouseY - sig.yPercent,
    });
  };

  const handlePageMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSig || !activeSignatureId || !pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    const newX = Math.max(0, Math.min(100 - 15, mouseX - dragStartOffset.x));
    const newY = Math.max(0, Math.min(100 - 8, mouseY - dragStartOffset.y));

    setPlacedSignatures((prev) =>
      prev.map((s) =>
        s.id === activeSignatureId ? { ...s, xPercent: newX, yPercent: newY } : s
      )
    );
  };

  const handlePageMouseUp = () => {
    setIsDraggingSig(false);
  };

  const removePlacedSignature = (id: string) => {
    setPlacedSignatures((prev) => prev.filter((s) => s.id !== id));
    if (activeSignatureId === id) setActiveSignatureId(null);
  };

  const handleEmbedAndDownload = async () => {
    if (!file || placedSignatures.length === 0) {
      alert('Please create and place at least one signature on your document first.');
      return;
    }

    setProcessingState({
      isProcessing: true,
      progress: 30,
      statusMessage: 'Embedding signature raster into PDF with pdf-lib...',
    });

    try {
      const signedPdfBytes = await embedSignaturesIntoPdf(file, placedSignatures);
      const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
      setResultBlob(blob);

      setProcessingState({
        isProcessing: false,
        progress: 100,
        statusMessage: 'Signed PDF ready!',
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
      const msg = err instanceof Error ? err.message : 'Signing failed';
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
    const filename = `${originalBase}-signed.pdf`;
    downloadBlob(resultBlob, filename);
  };

  const resetAll = () => {
    setFile(null);
    setPlacedSignatures([]);
    setActiveSignatureId(null);
    setResultBlob(null);
    setProcessingState({ isProcessing: false, progress: 0, statusMessage: '' });
  };

  const currentPageSignatures = placedSignatures.filter((s) => s.pageNumber === currentPage);

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
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span>Size: {formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>Page {currentPage} of {totalPages}</span>
                  <span>•</span>
                  <span>Signatures: {placedSignatures.length}</span>
                </div>
              </div>
            </div>

            <button
              id="change-sign-pdf-btn"
              onClick={resetAll}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Choose Another File</span>
            </button>
          </div>

          {/* Prominent Legal Disclaimer Banner (Required by prompt) */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Legal Disclaimer:</strong> This tool places a visual electronic signature image directly onto your PDF. It is not a cryptographic or certificate-based digital signature (PKI). Do not use this tool for transactions that legally mandate certified cryptographic signatures.
            </div>
          </div>

          {/* Signature Action Bar & Page Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {/* Create Signature Trigger */}
            <button
              type="button"
              id="open-signature-modal-btn"
              onClick={() => setShowSignatureModal(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Add New Signature</span>
            </button>

            {/* Page Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-white text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-medium text-slate-700 px-2">
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-white text-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Page Interactive Canvas Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Drag signature to reposition anywhere on the sheet</span>
              <span className="text-[11px] text-indigo-600 font-medium">
                {currentPageSignatures.length} signature(s) on Page {currentPage}
              </span>
            </div>

            <div
              ref={pageContainerRef}
              onMouseMove={handlePageMouseMove}
              onMouseUp={handlePageMouseUp}
              onMouseLeave={handlePageMouseUp}
              className="relative max-w-2xl mx-auto rounded-xl border-2 border-slate-300 bg-slate-100 overflow-hidden shadow-sm select-none"
              style={{ minHeight: '520px' }}
            >
              {pageRenderData?.dataUrl ? (
                <img
                  src={pageRenderData.dataUrl}
                  alt={`PDF Page ${currentPage}`}
                  className="w-full h-auto object-contain block pointer-events-none"
                />
              ) : (
                <div className="w-full h-96 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <PenTool className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="text-sm font-semibold">Page {currentPage} Canvas</p>
                  <p className="text-xs text-slate-400">Add a signature to place it on this page</p>
                </div>
              )}

              {/* Placed Signatures on Current Page */}
              {currentPageSignatures.map((sig) => {
                const isActive = activeSignatureId === sig.id;
                return (
                  <div
                    key={sig.id}
                    onMouseDown={(e) => handleSigMouseDown(e, sig)}
                    className={`absolute cursor-move group transition-shadow ${
                      isActive
                        ? 'ring-2 ring-indigo-500 shadow-md bg-indigo-50/20'
                        : 'hover:ring-1 hover:ring-indigo-300'
                    }`}
                    style={{
                      left: `${sig.xPercent}%`,
                      top: `${sig.yPercent}%`,
                      width: `${sig.widthPercent}%`,
                      height: `${sig.heightPercent}%`,
                    }}
                  >
                    <img
                      src={sig.dataUrl}
                      alt="Placed signature"
                      className="w-full h-full object-contain pointer-events-none"
                    />

                    {/* Controls Bar on Active Hover */}
                    <div className="absolute -top-7 right-0 hidden group-hover:flex items-center space-x-1 bg-slate-900 text-white rounded px-1.5 py-0.5 shadow-md">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePlacedSignature(sig.id);
                        }}
                        className="p-1 hover:text-rose-400 transition-colors"
                        title="Delete Signature"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Drag Grip Indicator */}
                    <div className="absolute bottom-0 right-0 p-0.5 text-indigo-600 opacity-60">
                      <Move className="w-2.5 h-2.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Processing Progress */}
          <ProcessingProgress
            state={processingState}
            title="Embedding signature onto PDF..."
          />

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Total placed: <strong className="text-slate-800 font-bold">{placedSignatures.length}</strong> signature(s)
            </div>

            <div className="flex items-center space-x-3">
              {resultBlob ? (
                <>
                  <button
                    type="button"
                    onClick={() => setResultBlob(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Keep Editing
                  </button>
                  <button
                    type="button"
                    id="download-signed-pdf-btn"
                    onClick={handleDownload}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('download')} ({formatFileSize(resultBlob.size)})</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  id="start-sign-pdf-btn"
                  disabled={processingState.isProcessing || placedSignatures.length === 0}
                  onClick={handleEmbedAndDownload}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm shadow-indigo-600/20 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('signPdf')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Signature Creation Modal */}
          {showSignatureModal && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
              <div
                className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-800">
                    Create Your Signature
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowSignatureModal(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
                  >
                    ✕
                  </button>
                </div>

                {/* Tabs: Draw, Type, Upload */}
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setSigMode('draw')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      sigMode === 'draw'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Draw</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSigMode('type')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      sigMode === 'type'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span>Type</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSigMode('upload')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      sigMode === 'upload'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>
                </div>

                {/* Mode 1: DRAW */}
                {sigMode === 'draw' && (
                  <div className="space-y-3">
                    <div className="relative border border-slate-300 rounded-xl bg-white overflow-hidden shadow-inner">
                      <canvas
                        ref={sigCanvasRef}
                        width={460}
                        height={160}
                        onMouseDown={startDrawing}
                        onMouseMove={drawStroke}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={drawStroke}
                        onTouchEnd={stopDrawing}
                        className="w-full h-40 cursor-crosshair block"
                      />
                      <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 select-none pointer-events-none font-mono">
                        Draw your signature above
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      {/* Color Palette */}
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500 font-medium">Color:</span>
                        {['#0f172a', '#1d4ed8', '#047857'].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setPenColor(color)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform ${
                              penColor === color ? 'scale-110 border-indigo-600 ring-2 ring-indigo-200' : 'border-white'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={clearDrawingCanvas}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                      >
                        Clear Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* Mode 2: TYPE */}
                {sigMode === 'type' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      placeholder="Type your full name"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Font Style Selection */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Cursive Script', font: 'cursive' },
                        { label: 'Serif Classic', font: 'Georgia, serif' },
                        { label: 'Modern Sans', font: 'sans-serif' },
                      ].map((f) => (
                        <div
                          key={f.font}
                          onClick={() => setTypedFont(f.font)}
                          className={`p-3 rounded-xl border-2 cursor-pointer text-center ${
                            typedFont === f.font
                              ? 'border-indigo-600 bg-indigo-50/50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="text-xl block text-slate-800 italic"
                            style={{ fontFamily: f.font }}
                          >
                            {typedName || 'Signature'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                            {f.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mode 3: UPLOAD */}
                {sigMode === 'upload' && (
                  <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl space-y-2">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-700">
                      Upload a photo or scan of your handwritten signature
                    </p>
                    <p className="text-[11px] text-slate-400">
                      White backgrounds are automatically made transparent!
                    </p>
                    <input
                      type="file"
                      id="upload-signature-image-input"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleSignatureImageUpload}
                      className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowSignatureModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  {sigMode !== 'upload' && (
                    <button
                      type="button"
                      id="apply-signature-to-doc-btn"
                      onClick={handleApplySignatureModal}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Place Signature on Page {currentPage}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
