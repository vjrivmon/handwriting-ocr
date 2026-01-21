"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface BenchmarkData {
  model: string;
  accuracy: number;
  cer: number;
  wer: number;
  time: number;
}

interface BenchmarkChartProps {
  data: BenchmarkData[];
  className?: string;
}

const COLORS = {
  high: "#22c55e",
  medium: "#eab308",
  low: "#ef4444",
};

function getBarColor(accuracy: number): string {
  if (accuracy >= 80) return COLORS.high;
  if (accuracy >= 60) return COLORS.medium;
  return COLORS.low;
}

export function BenchmarkChart({ data, className }: BenchmarkChartProps) {
  const chartData = data.map((item) => ({
    name: item.model.split(":")[0],
    accuracy: item.accuracy,
    fullName: item.model,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card>
        <CardHeader>
          <CardTitle>Benchmark de Modelos</CardTitle>
          <CardDescription>
            Comparacion de accuracy entre modelos OCR evaluados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 100]}
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            Accuracy:{" "}
                            <span className="font-semibold text-foreground">
                              {data.accuracy.toFixed(1)}%
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="accuracy"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(entry.accuracy)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLORS.high }}
              />
              <span>80%+ (Excelente)</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLORS.medium }}
              />
              <span>60-80% (Bueno)</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLORS.low }}
              />
              <span>&lt;60% (Mejorable)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
