"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatAccuracy, getAccuracyColor } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  accuracy: number;
  cer?: number;
  wer?: number;
  timeSeconds?: number;
  improvement?: number;
  className?: string;
}

export function MetricsCard({
  title,
  accuracy,
  cer,
  wer,
  timeSeconds,
  improvement,
  className,
}: MetricsCardProps) {
  const isImproved = improvement && improvement > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {improvement !== undefined && (
              <Badge
                variant={isImproved ? "success" : "destructive"}
                className="text-xs"
              >
                {isImproved ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {isImproved ? "+" : ""}
                {improvement.toFixed(1)}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-3xl font-bold tabular-nums",
                getAccuracyColor(accuracy),
              )}
            >
              {formatAccuracy(accuracy)}
            </span>
            <span className="text-sm text-muted-foreground">accuracy</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
            {cer !== undefined && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  CER
                </p>
                <p className="text-sm font-medium tabular-nums">
                  {(cer * 100).toFixed(1)}%
                </p>
              </div>
            )}
            {wer !== undefined && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  WER
                </p>
                <p className="text-sm font-medium tabular-nums">
                  {(wer * 100).toFixed(1)}%
                </p>
              </div>
            )}
            {timeSeconds !== undefined && (
              <div className="space-y-1 col-span-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Tiempo promedio
                </p>
                <p className="text-sm font-medium tabular-nums">
                  {timeSeconds.toFixed(2)}s
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
