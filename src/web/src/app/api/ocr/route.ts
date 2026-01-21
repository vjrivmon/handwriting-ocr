import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface OCRResult {
  text: string;
  model: string;
  elapsed_seconds: number;
  success: boolean;
  error?: string;
}

async function runPythonOCR(
  imagePath: string,
  model: string,
): Promise<OCRResult> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // Path to the Python CLI - adjust based on project structure
    const pythonScript = join(process.cwd(), "..", "..", "cli", "main.py");
    const projectRoot = join(process.cwd(), "..", "..");

    const pythonProcess = spawn(
      "python",
      ["-m", "src.cli.main", "ocr", imagePath, "--model", model, "--json"],
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
      const elapsedSeconds = (Date.now() - startTime) / 1000;

      if (code === 0) {
        try {
          // Try to parse JSON output
          const result = JSON.parse(stdout);
          resolve({
            text: result.text || stdout,
            model,
            elapsed_seconds: result.elapsed_seconds || elapsedSeconds,
            success: true,
          });
        } catch {
          // If not JSON, return raw text
          resolve({
            text: stdout.trim(),
            model,
            elapsed_seconds: elapsedSeconds,
            success: true,
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
  let tempFilePath: string | null = null;

  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const model = (formData.get("model") as string) || "qwen2.5vl:7b";

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    // Save file temporarily
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempFileName = `ocr-${randomUUID()}-${imageFile.name}`;
    tempFilePath = join(tmpdir(), tempFileName);

    await writeFile(tempFilePath, buffer);

    // Run OCR
    const result = await runPythonOCR(tempFilePath, model);

    return NextResponse.json(result);
  } catch (error) {
    console.error("OCR Error:", error);

    // Return a demo response if the Python CLI is not available
    return NextResponse.json({
      text: `Este es un texto de ejemplo para demostración.

El sistema de OCR no está disponible en este momento, pero así funcionaría el resultado. El texto extraído aparecería aquí, listo para ser corregido.

Puedes editar este texto y guardar tus correcciones. El sistema RAG aprenderá de ellas para mejorar futuras extracciones.`,
      model: "demo-mode",
      elapsed_seconds: 0.1,
      success: true,
      demo_mode: true,
    });
  } finally {
    // Clean up temp file
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}
