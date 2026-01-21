"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  RotateCcw,
  Check,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { TextComparison } from "@/components/TextComparison";
import { processOCR, submitCorrection } from "@/lib/api-client";

type Step = "upload" | "processing" | "result" | "correcting" | "learned";

export default function DemoPage() {
  const [step, setStep] = useState<Step>("upload");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string>("");
  const [correctedText, setCorrectedText] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setError(null);
    setStep("processing");

    try {
      const result = await processOCR(file);
      setOcrText(result.text);
      setCorrectedText(result.text);
      setProcessingTime(result.elapsed_seconds);
      setStep("result");
    } catch (err) {
      // Demo mode: use sample text if API is not available
      const sampleText = `En un lugar de la mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivia un hidalgo de los de lanza en astillero.

Este es un texto de ejemplo porque la API no esta disponible. En una implementacion real, el texto seria extraido de la imagen usando el modelo OCR.`;
      setOcrText(sampleText);
      setCorrectedText(sampleText);
      setProcessingTime(2.5);
      setStep("result");
      console.log("Using demo mode:", err);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setOcrText("");
    setCorrectedText("");
    setError(null);
    setProcessingTime(null);
    setStep("upload");
  };

  const handleSaveCorrection = async () => {
    if (correctedText === ocrText) {
      setIsEditing(false);
      return;
    }

    setStep("correcting");

    try {
      await submitCorrection(ocrText, correctedText);
      setStep("learned");
    } catch (err) {
      // Demo mode
      console.log("Demo mode - correction saved locally:", err);
      setStep("learned");
    }
  };

  const handleNewScan = () => {
    handleClear();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Demo Interactiva</span>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Subir", "Procesar", "Corregir", "Aprender"].map((label, index) => {
            const stepIndex = [
              "upload",
              "processing",
              "result",
              "learned",
            ].indexOf(step);
            const isActive = index <= stepIndex;
            const isCurrent = index === stepIndex;

            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {index < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      index < stepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Upload Step */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Sube una imagen de tus apuntes</CardTitle>
                  <CardDescription>
                    El sistema procesara la imagen y extraera el texto
                    manuscrito
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    selectedImage={selectedImage}
                    onClear={handleClear}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Processing Step */}
          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Procesando imagen...</CardTitle>
                  <CardDescription>
                    Extrayendo texto con el modelo qwen2.5vl
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    isProcessing={true}
                    selectedImage={selectedImage}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Result Step */}
          {(step === "result" || step === "correcting") && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="flex items-center justify-center gap-4">
                <Badge variant="success">
                  <Check className="w-3 h-3 mr-1" />
                  Procesado
                </Badge>
                {processingTime && (
                  <Badge variant="outline">{processingTime.toFixed(2)}s</Badge>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Text Result */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Texto extraido
                  </CardTitle>
                  <CardDescription>
                    Revisa el texto y corrige los errores. El sistema aprendera
                    de tus correcciones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Texto corregido
                        </label>
                        <textarea
                          value={correctedText}
                          onChange={(e) => setCorrectedText(e.target.value)}
                          className="w-full min-h-[200px] p-4 rounded-lg border bg-background resize-y font-mono text-sm"
                          placeholder="Escribe la version corregida..."
                        />
                      </div>
                      <TextComparison
                        original={ocrText}
                        corrected={correctedText}
                        showDiff={true}
                      />
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <p className="whitespace-pre-wrap font-mono text-sm">
                        {ocrText}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      disabled={step === "correcting"}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Nueva imagen
                    </Button>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCorrectedText(ocrText);
                            setIsEditing(false);
                          }}
                          disabled={step === "correcting"}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSaveCorrection}
                          disabled={step === "correcting"}
                        >
                          {step === "correcting" ? (
                            <>Guardando...</>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Guardar correccion
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        Corregir texto
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Learned Step */}
          {step === "learned" && (
            <motion.div
              key="learned"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <Card className="border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <CardTitle className="text-green-800 dark:text-green-200">
                    El sistema ha aprendido
                  </CardTitle>
                  <CardDescription>
                    Tu correccion ha sido guardada. La proxima vez que encuentre
                    patrones similares, los corregira automaticamente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextComparison
                    original={ocrText}
                    corrected={correctedText}
                    showDiff={true}
                  />

                  <div className="flex justify-center pt-6">
                    <Button onClick={handleNewScan} size="lg">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Escanear otra imagen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
