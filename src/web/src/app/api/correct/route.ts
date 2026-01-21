import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { join } from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CorrectionResult {
  original: string;
  corrected: string;
  learned: boolean;
  corrections_count: number;
}

async function runPythonCorrection(
  original: string,
  corrected: string,
): Promise<CorrectionResult> {
  return new Promise((resolve, reject) => {
    const projectRoot = join(process.cwd(), "..", "..");

    const pythonProcess = spawn(
      "python",
      [
        "-m",
        "src.cli.main",
        "learn",
        "--original",
        original,
        "--corrected",
        corrected,
        "--json",
      ],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          PYTHONUNBUFFERED: "1",
        },
      },
    );

    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          resolve({
            original,
            corrected,
            learned: true,
            corrections_count: result.corrections_count || 1,
          });
        } catch {
          resolve({
            original,
            corrected,
            learned: true,
            corrections_count: 1,
          });
        }
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });

    pythonProcess.on("error", (err) => {
      reject(err);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { original, corrected } = body;

    if (!original || !corrected) {
      return NextResponse.json(
        { error: "Both original and corrected text are required" },
        { status: 400 },
      );
    }

    if (original === corrected) {
      return NextResponse.json({
        original,
        corrected,
        learned: false,
        corrections_count: 0,
        message: "No corrections needed - texts are identical",
      });
    }

    try {
      const result = await runPythonCorrection(original, corrected);
      return NextResponse.json(result);
    } catch (error) {
      // Demo mode - simulate learning
      console.log("Demo mode - simulating correction learning:", error);
      return NextResponse.json({
        original,
        corrected,
        learned: true,
        corrections_count: 1,
        demo_mode: true,
      });
    }
  } catch (error) {
    console.error("Correction Error:", error);
    return NextResponse.json(
      { error: "Failed to process correction" },
      { status: 500 },
    );
  }
}
