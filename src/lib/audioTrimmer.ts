/**
 * High-precision client-side audio engine using Web Audio API
 */

export interface WaveformData {
  peaks: number[]; // Normalized amplitude 0 to 1
  duration: number;
  sampleRate: number;
  channels: number;
}

export async function extractWaveformData(
  file: File,
  numBuckets = 300
): Promise<{ buffer: AudioBuffer; waveform: WaveformData }> {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  
  const buffer = await audioCtx.decodeAudioData(arrayBuffer);
  const rawData = buffer.getChannelData(0); // Left channel or mono
  const totalSamples = rawData.length;
  const bucketSize = Math.floor(totalSamples / numBuckets);
  const peaks: number[] = [];

  for (let i = 0; i < numBuckets; i++) {
    const start = i * bucketSize;
    let max = 0;
    for (let j = 0; j < bucketSize; j++) {
      const val = Math.abs(rawData[start + j] || 0);
      if (val > max) max = val;
    }
    peaks.push(max);
  }

  // Normalize peaks so highest is ~1.0
  const maxPeak = Math.max(...peaks, 0.01);
  const normalized = peaks.map((p) => Math.min(1, p / maxPeak));

  return {
    buffer,
    waveform: {
      peaks: normalized,
      duration: buffer.duration,
      sampleRate: buffer.sampleRate,
      channels: buffer.numberOfChannels,
    },
  };
}

export function trimAudioBuffer(
  sourceBuffer: AudioBuffer,
  startTime: number,
  endTime: number,
  fadeIn = false,
  fadeOut = false
): AudioBuffer {
  const sampleRate = sourceBuffer.sampleRate;
  const startSample = Math.max(0, Math.floor(startTime * sampleRate));
  const endSample = Math.min(sourceBuffer.length, Math.ceil(endTime * sampleRate));
  const trimmedLength = Math.max(1, endSample - startSample);

  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const trimmedBuffer = audioCtx.createBuffer(
    sourceBuffer.numberOfChannels,
    trimmedLength,
    sampleRate
  );

  const fadeSamples = Math.min(Math.floor(sampleRate * 0.03), Math.floor(trimmedLength / 4)); // 30ms fade

  for (let ch = 0; ch < sourceBuffer.numberOfChannels; ch++) {
    const src = sourceBuffer.getChannelData(ch);
    const dest = trimmedBuffer.getChannelData(ch);

    for (let i = 0; i < trimmedLength; i++) {
      let sample = src[startSample + i];

      // Fade In
      if (fadeIn && i < fadeSamples) {
        sample *= i / fadeSamples;
      }
      // Fade Out
      if (fadeOut && i > trimmedLength - fadeSamples) {
        sample *= (trimmedLength - i) / fadeSamples;
      }

      dest[i] = sample;
    }
  }

  return trimmedBuffer;
}

export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  let sample = 0;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    out.setUint32(pos, data, true);
    pos += 4;
  }

  // RIFF identifier
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // FMT sub-chunk
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // 16 for PCM
  setUint16(1); // PCM format code
  setUint16(numOfChan);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * numOfChan); // byte rate
  setUint16(numOfChan * 2); // block align
  setUint16(16); // 16 bits per sample

  // data sub-chunk
  setUint32(0x61746164); // "data" chunk
  setUint32(length - pos - 4);

  // Write interleaved PCM samples
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      // scale to 16-bit signed int
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      out.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([out], { type: 'audio/wav' });
}
