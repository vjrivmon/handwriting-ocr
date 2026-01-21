export interface OCRResult {
  text: string;
  model: string;
  elapsed_seconds: number;
  success: boolean;
  error?: string;
}

export interface CorrectionResult {
  original: string;
  corrected: string;
  learned: boolean;
  corrections_count: number;
}

export interface BenchmarkSample {
  sample: string;
  ground_truth: string;
  prediction: string;
  elapsed_seconds: number;
  success: boolean;
  metrics: {
    cer: number;
    wer: number;
    accuracy_pct: number;
    total_chars: number;
    total_words: number;
  };
}

export interface BenchmarkResult {
  model: string;
  summary: {
    avg_cer: number;
    avg_wer: number;
    avg_accuracy_pct: number;
    avg_time_seconds: number;
    success_rate_pct: number;
  };
  samples: BenchmarkSample[];
}

export interface BenchmarkData {
  timestamp: string;
  config: {
    models: string[];
    num_runs: number;
  };
  results: BenchmarkResult[];
}

export async function processOCR(
  imageFile: File,
  model: string = "qwen2.5vl:7b",
): Promise<OCRResult> {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("model", model);

  const response = await fetch("/api/ocr", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "OCR processing failed");
  }

  return response.json();
}

export async function submitCorrection(
  original: string,
  corrected: string,
): Promise<CorrectionResult> {
  const response = await fetch("/api/correct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ original, corrected }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Correction submission failed");
  }

  return response.json();
}

export async function getBenchmarkData(): Promise<BenchmarkData | null> {
  try {
    const response = await fetch("/api/benchmark");
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}
