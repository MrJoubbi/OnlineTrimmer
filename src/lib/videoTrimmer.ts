/**
 * Client-side video trimming engine.
 * Processes video segments directly in the browser without server uploads.
 */

export interface TrimOptions {
  startTime: number;
  endTime: number;
  outputFormat: 'mp4' | 'webm';
  onProgress?: (progress: number, stage: string) => void;
}

export async function trimVideoClientSide(
  videoFile: File,
  options: TrimOptions
): Promise<Blob> {
  const { startTime, endTime, outputFormat, onProgress } = options;
  const duration = Math.max(0.1, endTime - startTime);

  onProgress?.(5, 'Preparing media decoder...');

  return new Promise((resolve, reject) => {
    const videoUrl = URL.createObjectURL(videoFile);
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = false;
    video.playsInline = true;
    video.src = videoUrl;

    // Determine supported mime types for recording
    const mimeCandidates = outputFormat === 'mp4'
      ? ['video/mp4;codecs=avc1,mp4a.40.2', 'video/mp4', 'video/webm;codecs=h264', 'video/webm']
      : ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];

    const chosenMime = mimeCandidates.find((mime) => MediaRecorder.isTypeSupported(mime)) || 'video/webm';

    video.onloadedmetadata = async () => {
      onProgress?.(15, 'Seeking to cut point...');
      video.currentTime = startTime;
    };

    video.onseeked = async () => {
      try {
        onProgress?.(25, 'Capturing video stream...');

        // Create stream from video element
        let stream: MediaStream;
        const videoElementWithCapture = video as unknown as {
          captureStream?: () => MediaStream;
          mozCaptureStream?: () => MediaStream;
        };

        if (videoElementWithCapture.captureStream) {
          stream = videoElementWithCapture.captureStream();
        } else if (videoElementWithCapture.mozCaptureStream) {
          stream = videoElementWithCapture.mozCaptureStream();
        } else {
          // Fallback: use canvas capture
          throw new Error('Browser media capture not supported on this device');
        }

        const recorder = new MediaRecorder(stream, {
          mimeType: chosenMime,
          videoBitsPerSecond: 4_500_000, // 4.5 Mbps crisp quality
        });

        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        recorder.onstop = () => {
          onProgress?.(95, 'Finalizing video container...');
          const resultBlob = new Blob(chunks, { type: chosenMime });
          URL.revokeObjectURL(videoUrl);
          video.pause();
          video.src = '';
          video.load();
          onProgress?.(100, 'Done!');
          resolve(resultBlob);
        };

        recorder.onerror = (e) => {
          URL.revokeObjectURL(videoUrl);
          reject(new Error('MediaRecorder error: ' + (e as unknown as { error?: { message?: string } })?.error?.message || 'Unknown error'));
        };

        // Start recording
        recorder.start(100);
        await video.play();

        const checkInterval = setInterval(() => {
          const currentProgressTime = video.currentTime - startTime;
          const pct = Math.min(90, Math.max(25, Math.floor(25 + (currentProgressTime / duration) * 65)));
          onProgress?.(pct, `Trimming: ${currentProgressTime.toFixed(1)}s / ${duration.toFixed(1)}s`);

          if (video.currentTime >= endTime || video.ended) {
            clearInterval(checkInterval);
            video.pause();
            if (recorder.state === 'recording') {
              recorder.stop();
            }
          }
        }, 80);

        // Safety timeout in case video stalls
        setTimeout(() => {
          clearInterval(checkInterval);
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }, (duration + 5) * 1000);
      } catch (err) {
        URL.revokeObjectURL(videoUrl);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(videoUrl);
      reject(new Error('Failed to load video file. Ensure format is supported by your browser.'));
    };
  });
}
