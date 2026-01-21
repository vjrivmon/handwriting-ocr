"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Zap,
  Shield,
  Github,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BenchmarkChart } from "@/components/BenchmarkChart";
import { MetricsCard } from "@/components/MetricsCard";

// Sample data for the demo
const SAMPLE_OCR_RAW = `en un luguer de la monde, de cuyo nombre no quiero recordarme, no he mucho tiempo que via en hidalgos del borde de lentez en atilleros adorade antiguos, roca floco y golgo conedor.`;

const SAMPLE_OCR_CORRECTED = `En un lugar de la mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivia un hidalgo de los de lanza en astillero, adarga antigua, rocin flaco y galgo corredor.`;

// Benchmark data from actual results
const benchmarkData = [
  {
    model: "qwen2.5vl:7b",
    accuracy: 81.91,
    cer: 0.1809,
    wer: 0.1809,
    time: 9.36,
  },
  {
    model: "minicpm-v",
    accuracy: 55.79,
    cer: 0.4421,
    wer: 0.4421,
    time: 6.08,
  },
];

const features = [
  {
    icon: Brain,
    title: "Aprende de ti",
    description:
      "Sistema RAG que memoriza tus correcciones y las aplica automaticamente en el futuro.",
  },
  {
    icon: Zap,
    title: "100% Offline",
    description:
      "Funciona completamente local con Ollama. Sin APIs caras, sin enviar datos a la nube.",
  },
  {
    icon: Shield,
    title: "Privacidad Total",
    description:
      "Tus documentos y correcciones nunca salen de tu maquina. Tu letra, tus reglas.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Handwriting OCR</span>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/demo">
              <Button variant="ghost">Demo</Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Github className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Badge variant="outline" className="px-4 py-1">
              Open Source + 100% Offline
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              OCR que aprende <span className="text-primary">TU letra</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convierte tus apuntes manuscritos a texto digital. El sistema
              aprende de tus correcciones y mejora automaticamente con el
              tiempo.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/demo">
                <Button size="lg" className="gap-2">
                  Probar Demo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Ver como funciona
              </Button>
            </div>
          </motion.div>

          {/* Before/After Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <BeforeAfter
              beforeText={SAMPLE_OCR_RAW}
              afterText={SAMPLE_OCR_CORRECTED}
              beforeLabel="OCR sin correcciones"
              afterLabel="Con sistema RAG"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <ChevronDown className="w-6 h-6 animate-bounce text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="destructive" className="mb-4">
              El Problema
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Los OCR genericos fallan con letra manuscrita
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Google Lens, Tesseract, apps de notas... todos cometen los mismos
              errores una y otra vez. &quot;de&quot; se convierte en
              &quot;ole&quot;, &quot;la&quot; en &quot;le&quot;. Sin forma de
              aprender de las correcciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <MetricsCard
              title="qwen2.5vl:7b"
              accuracy={81.91}
              cer={0.1809}
              wer={0.1809}
              timeSeconds={9.36}
              improvement={26.12}
            />
            <MetricsCard
              title="minicpm-v"
              accuracy={55.79}
              cer={0.4421}
              wer={0.4421}
              timeSeconds={6.08}
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="success" className="mb-4">
              La Solucion
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Sistema RAG de correcciones personalizadas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada vez que corriges un error, el sistema lo memoriza. La proxima
              vez que encuentre el mismo patron, lo corrige automaticamente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Benchmarks
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Comparativa de modelos evaluados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evaluamos multiples modelos de vision con 16 muestras de escritura
              manuscrita real para encontrar el mejor rendimiento.
            </p>
          </motion.div>

          <BenchmarkChart data={benchmarkData} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold">Prueba la demo ahora</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sube una imagen de tus apuntes y ve como funciona el sistema de
              OCR con correcciones aprendidas.
            </p>
            <Link href="/demo">
              <Button size="lg" className="gap-2">
                Ir a la Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Handwriting OCR - Open Source
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Stack: Python + Ollama + Next.js</span>
            <a
              href="https://github.com"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
