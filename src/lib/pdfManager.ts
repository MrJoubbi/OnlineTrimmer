import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { PdfPagePreview, PlacedSignature, PlacedTextStamp } from '../types';

// Set up pdf.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export async function renderPdfThumbnails(
  file: File,
  scale = 0.5,
  onProgress?: (current: number, total: number) => void
): Promise<PdfPagePreview[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const previews: PdfPagePreview[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    previews.push({
      pageNumber: pageNum,
      dataUrl: canvas.toDataURL('image/jpeg', 0.85),
      width: viewport.width,
      height: viewport.height,
    });

    onProgress?.(pageNum, numPages);
  }

  return previews;
}

export async function renderPdfSinglePage(
  file: File,
  pageNumber: number,
  scale = 1.5
): Promise<{ dataUrl: string; width: number; height: number; originalWidth: number; originalHeight: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const unscaledViewport = page.getViewport({ scale: 1 });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: ctx,
    viewport: viewport,
  }).promise;

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: viewport.width,
    height: viewport.height,
    originalWidth: unscaledViewport.width,
    originalHeight: unscaledViewport.height,
  };
}

/**
 * Splits / extracts selected pages into a new PDF using pdf-lib
 */
export async function extractPdfPages(
  file: File,
  pageNumbersToKeep: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(arrayBuffer);
  const newDoc = await PDFDocument.create();

  // Convert 1-indexed to 0-indexed
  const zeroIndexedPages = pageNumbersToKeep
    .map((p) => p - 1)
    .filter((idx) => idx >= 0 && idx < sourceDoc.getPageCount());

  const copiedPages = await newDoc.copyPages(sourceDoc, zeroIndexedPages);
  for (const page of copiedPages) {
    newDoc.addPage(page);
  }

  return await newDoc.save();
}

/**
 * Embeds placed signatures and text stamps onto a PDF using pdf-lib
 */
export async function embedSignaturesIntoPdf(
  file: File,
  signatures: PlacedSignature[],
  stamps: PlacedTextStamp[] = []
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  for (const sig of signatures) {
    const pageIndex = sig.pageNumber - 1;
    if (pageIndex < 0 || pageIndex >= pages.length) continue;

    const page = pages[pageIndex];
    const { width: pageWidth, height: pageHeight } = page.getSize();

    // Convert dataUrl to bytes
    const pngImageBytes = await fetch(sig.dataUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // Calculate dimensions & coordinates in PDF points
    // Note: PDF coordinate system has (0,0) at bottom-left
    const targetWidth = (sig.widthPercent / 100) * pageWidth;
    const targetHeight = (sig.heightPercent / 100) * pageHeight;
    const targetX = (sig.xPercent / 100) * pageWidth;
    // Invert Y for PDF bottom-left origin
    const targetY = pageHeight - (sig.yPercent / 100) * pageHeight - targetHeight;

    page.drawImage(pngImage, {
      x: targetX,
      y: Math.max(0, targetY),
      width: targetWidth,
      height: targetHeight,
    });
  }

  // Draw text stamps (e.g., date stamps)
  for (const stamp of stamps) {
    const pageIndex = stamp.pageNumber - 1;
    if (pageIndex < 0 || pageIndex >= pages.length) continue;

    const page = pages[pageIndex];
    const { width: pageWidth, height: pageHeight } = page.getSize();

    const targetX = (stamp.xPercent / 100) * pageWidth;
    const targetY = pageHeight - (stamp.yPercent / 100) * pageHeight;

    page.drawText(stamp.text, {
      x: targetX,
      y: Math.max(10, targetY),
      size: stamp.fontSize || 12,
    });
  }

  return await pdfDoc.save();
}
