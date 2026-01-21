import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BenchmarkData {
  timestamp: string;
  config: {
    models: string[];
    num_runs: number;
  };
  results: Array<{
    model: string;
    summary: {
      avg_cer: number;
      avg_wer: number;
      avg_accuracy_pct: number;
      avg_time_seconds: number;
      success_rate_pct: number;
    };
    samples: Array<{
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
    }>;
  }>;
}

export async function GET() {
  try {
    // Path to results directory - adjust based on project structure
    const projectRoot = join(process.cwd(), "..", "..");
    const resultsDir = join(projectRoot, "results");

    // Find the most recent benchmark file
    const files = await readdir(resultsDir);
    const benchmarkFiles = files
      .filter((f) => f.startsWith("benchmark_") && f.endsWith(".json"))
      .sort()
      .reverse();

    if (benchmarkFiles.length === 0) {
      // Return demo data if no benchmark files exist
      return NextResponse.json({
        timestamp: new Date().toISOString(),
        config: {
          models: ["qwen2.5vl:7b", "minicpm-v"],
          num_runs: 3,
        },
        results: [
          {
            model: "qwen2.5vl:7b",
            summary: {
              avg_cer: 0.1809,
              avg_wer: 0.1809,
              avg_accuracy_pct: 81.91,
              avg_time_seconds: 9.363,
              success_rate_pct: 100.0,
            },
            samples: [],
          },
          {
            model: "minicpm-v",
            summary: {
              avg_cer: 0.4421,
              avg_wer: 0.4421,
              avg_accuracy_pct: 55.79,
              avg_time_seconds: 6.081,
              success_rate_pct: 100.0,
            },
            samples: [],
          },
        ],
        demo_mode: true,
      });
    }

    const latestFile = benchmarkFiles[0];
    const filePath = join(resultsDir, latestFile);
    const content = await readFile(filePath, "utf-8");
    const data: BenchmarkData = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Benchmark fetch error:", error);

    // Return demo data on error
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      config: {
        models: ["qwen2.5vl:7b", "minicpm-v"],
        num_runs: 3,
      },
      results: [
        {
          model: "qwen2.5vl:7b",
          summary: {
            avg_cer: 0.1809,
            avg_wer: 0.1809,
            avg_accuracy_pct: 81.91,
            avg_time_seconds: 9.363,
            success_rate_pct: 100.0,
          },
          samples: [],
        },
        {
          model: "minicpm-v",
          summary: {
            avg_cer: 0.4421,
            avg_wer: 0.4421,
            avg_accuracy_pct: 55.79,
            avg_time_seconds: 6.081,
            success_rate_pct: 100.0,
          },
          samples: [],
        },
      ],
      demo_mode: true,
    });
  }
}
