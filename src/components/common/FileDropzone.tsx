import React, { useState, useRef, DragEvent } from 'react';
import { UploadCloud, Link as LinkIcon, AlertCircle, FileCheck, Sparkles, Loader2 } from 'lucide-react';
import { ToolConfig } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface FileDropzoneProps {
  toolConfig: ToolConfig;
  onFileSelected: (file: File) => void;
  sampleFileType?: 'video' | 'audio' | 'pdf';
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  toolConfig,
  onFileSelected,
  sampleFileType = 'video',
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSelect = (file: File) => {
    setErrorMessage(null);

    // Max 1GB check for client memory safety
    const maxBytes = 1024 * 1024 * 1024; // 1GB
    if (file.size > maxBytes) {
      setErrorMessage(
        `File is too large (${(file.size / (1024 * 1024)).toFixed(0)} MB). For optimal in-browser memory performance, please select a file under 1 GB.`
      );
      return;
    }

    // Check extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const isExtensionMatch = toolConfig.acceptedExtensions.some((e) => e.toLowerCase() === ext);
    const isMimeMatch = toolConfig.acceptedMimeTypes.some((mime) => {
      if (mime.endsWith('/*')) {
        const prefix = mime.split('/')[0];
        return file.type.startsWith(prefix);
      }
      return file.type === mime;
    });

    if (!isExtensionMatch && !isMimeMatch && file.type !== '') {
      setErrorMessage(
        `Unsupported file type (${file.name}). Please provide a supported file: ${toolConfig.acceptedExtensions.join(', ')}`
      );
      return;
    }

    onFileSelected(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const handleFetchUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setErrorMessage(null);
    setIsLoadingUrl(true);
    try {
      const response = await fetch(urlInput.trim());
      if (!response.ok) {
        throw new Error(`Failed to fetch file (HTTP ${response.status})`);
      }
      const blob = await response.blob();
      const filename = urlInput.split('/').pop()?.split('?')[0] || `media-from-url${toolConfig.acceptedExtensions[0] || ''}`;
      const file = new File([blob], filename, { type: blob.type || 'application/octet-stream' });
      validateAndSelect(file);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to download from URL';
      setErrorMessage(`${msg}. Note: Remote servers must permit Cross-Origin (CORS) access.`);
    } finally {
      setIsLoadingUrl(false);
    }
  };

  // Generate synthetic sample files on-the-fly for immediate testing
  const loadSampleFile = async () => {
    setErrorMessage(null);
    setIsLoadingUrl(true);

    try {
      if (sampleFileType === 'video') {
        // Generate a 4-second canvas animated test video via MediaRecorder
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext('2d')!;
        const stream = canvas.captureStream(30);
        
        // Add synthetic tone audio track
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const dest = audioCtx.createMediaStreamDestination();
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.connect(dest);
        osc.start();
        stream.addTrack(dest.stream.getAudioTracks()[0]);

        const mime = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';
        const recorder = new MediaRecorder(stream, { mimeType: mime });
        const chunks: Blob[] = [];

        recorder.ondataavailable = (ev) => {
          if (ev.data.size > 0) chunks.push(ev.data);
        };

        recorder.start();

        let frame = 0;
        const totalFrames = 120; // 4 seconds at 30 fps
        const interval = setInterval(() => {
          frame++;
          // Draw video background & timer
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Moving gradient ball
          const x = 100 + Math.sin(frame * 0.1) * 200 + 100;
          const y = 180 + Math.cos(frame * 0.1) * 60;
          const grad = ctx.createRadialGradient(x, y, 10, x, y, 60);
          grad.addColorStop(0, '#10b981');
          grad.addColorStop(1, '#047857');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, 45, 0, Math.PI * 2);
          ctx.fill();

          // Text overlay
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('OnlineTrimmer Sample Video', 160, 90);
          ctx.font = '18px monospace';
          ctx.fillText(`Frame: ${frame} / ${totalFrames} (Time: ${(frame / 30).toFixed(2)}s)`, 160, 130);

          if (frame >= totalFrames) {
            clearInterval(interval);
            recorder.stop();
            osc.stop();
            audioCtx.close();
          }
        }, 1000 / 30);

        recorder.onstop = () => {
          const extension = mime.includes('mp4') ? 'mp4' : 'webm';
          const sampleBlob = new Blob(chunks, { type: mime });
          const file = new File([sampleBlob], `sample-clip.${extension}`, { type: mime });
          validateAndSelect(file);
          setIsLoadingUrl(false);
        };
      } else if (sampleFileType === 'audio') {
        // Generate synthetic 5-second melodic WAV
        const sampleRate = 44100;
        const durationSec = 5;
        const totalSamples = sampleRate * durationSec;
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const buffer = audioCtx.createBuffer(2, totalSamples, sampleRate);

        for (let ch = 0; ch < 2; ch++) {
          const data = buffer.getChannelData(ch);
          for (let i = 0; i < totalSamples; i++) {
            const t = i / sampleRate;
            // Chord progression C-E-G-B
            const noteFreq = t < 1.25 ? 261.63 : t < 2.5 ? 329.63 : t < 3.75 ? 392.0 : 493.88;
            const envelope = Math.sin((t % 1.25) * Math.PI / 1.25);
            data[i] = Math.sin(2 * Math.PI * noteFreq * t) * envelope * 0.4;
          }
        }

        // Convert to WAV Blob
        const { audioBufferToWavBlob } = await import('../../lib/audioTrimmer');
        const wavBlob = audioBufferToWavBlob(buffer);
        const file = new File([wavBlob], 'sample-audio-track.wav', { type: 'audio/wav' });
        validateAndSelect(file);
        setIsLoadingUrl(false);
      } else if (sampleFileType === 'pdf') {
        // Generate a clean 3-page sample PDF using pdf-lib
        const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
        const pdfDoc = await PDFDocument.create();
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const pageTitles = [
          'Service Agreement — OnlineTrimmer Demo Document',
          'Terms & Specifications (Page 2 of 3)',
          'Signature & Approval Execution Sheet (Page 3 of 3)',
        ];

        for (let i = 0; i < pageTitles.length; i++) {
          const page = pdfDoc.addPage([600, 400]);
          page.drawText(pageTitles[i], {
            x: 50,
            y: 350,
            size: 16,
            font: helveticaBold,
            color: rgb(0.06, 0.09, 0.16),
          });

          page.drawText(
            `This is an interactive demonstration page generated for client-side testing.\nEverything processes locally in your browser with zero server uploads.\nPage Number: ${i + 1} of ${pageTitles.length}`,
            {
              x: 50,
              y: 290,
              size: 11,
              font: helveticaFont,
              lineHeight: 18,
              color: rgb(0.2, 0.25, 0.35),
            }
          );

          if (i === 2) {
            // Draw signature box guide
            page.drawRectangle({
              x: 50,
              y: 110,
              width: 320,
              height: 70,
              borderColor: rgb(0.6, 0.65, 0.75),
              borderWidth: 1,
              color: rgb(0.97, 0.98, 0.99),
            });
            page.drawText('X __________________________________', {
              x: 65,
              y: 130,
              size: 12,
              font: helveticaFont,
              color: rgb(0.4, 0.45, 0.55),
            });
            page.drawText('Place Your Signature Here', {
              x: 65,
              y: 155,
              size: 10,
              font: helveticaBold,
              color: rgb(0.3, 0.4, 0.5),
            });
          }
        }

        const pdfBytes = await pdfDoc.save();
        const file = new File([pdfBytes], 'sample-document-agreement.pdf', { type: 'application/pdf' });
        validateAndSelect(file);
        setIsLoadingUrl(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not generate sample file';
      setErrorMessage(msg);
      setIsLoadingUrl(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main Drag & Drop Card */}
      <div
        id="file-dropzone-container"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/70 scale-[1.01]'
            : 'border-slate-300 hover:border-emerald-500/70 bg-white hover:bg-slate-50/60 shadow-xs'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload-input"
          accept={toolConfig.acceptedExtensions.join(',') + ',' + toolConfig.acceptedMimeTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 mb-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-200">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {t('dropzoneTitle')}
          </h3>

          <p className="text-xs text-slate-500 mb-4 max-w-sm">
            {t('dropzoneSubtitle')}
          </p>

          <button
            type="button"
            id="browse-files-btn"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors"
          >
            {t('chooseFile')}
          </button>

          {/* Formats Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
            {toolConfig.acceptedExtensions.map((ext) => (
              <span
                key={ext}
                className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono font-medium text-slate-600"
              >
                {ext}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Auxiliary actions: Sample file & URL paste */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 px-2">
        <button
          type="button"
          id="load-sample-btn"
          onClick={loadSampleFile}
          disabled={isLoadingUrl}
          className="inline-flex items-center space-x-1.5 text-xs text-slate-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer py-1"
        >
          {isLoadingUrl ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span>{t('trySample')}</span>
        </button>

        <button
          type="button"
          id="toggle-url-input-btn"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlInput ? '✕' : t('pasteUrl')}</span>
        </button>
      </div>

      {/* URL paste input expander */}
      {showUrlInput && (
        <form onSubmit={handleFetchUrl} className="mt-3 flex gap-2">
          <input
            type="url"
            id="url-import-input"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            id="fetch-url-submit-btn"
            disabled={isLoadingUrl || !urlInput.trim()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            {isLoadingUrl ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileCheck className="w-3.5 h-3.5" />}
            <span>Fetch</span>
          </button>
        </form>
      )}

      {/* Error display */}
      {errorMessage && (
        <div className="mt-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
