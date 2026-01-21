"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { diffWords } from "diff";
import { cn } from "@/lib/utils";

interface TextComparisonProps {
  original: string;
  corrected: string;
  showDiff?: boolean;
  className?: string;
}

export function TextComparison({
  original,
  corrected,
  showDiff = true,
  className,
}: TextComparisonProps) {
  const diffResult = useMemo(() => {
    if (!showDiff) return null;
    return diffWords(original, corrected);
  }, [original, corrected, showDiff]);

  if (!showDiff) {
    return (
      <div className={cn("grid grid-cols-2 gap-4", className)}>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Original (OCR)
          </h4>
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50">
            <p className="text-sm whitespace-pre-wrap font-mono">{original}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Corregido
          </h4>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50">
            <p className="text-sm whitespace-pre-wrap font-mono">{corrected}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">
          Comparacion (diferencias resaltadas)
        </h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-lg bg-muted/50 border"
        >
          <p className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {diffResult?.map((part, index) => {
              if (part.removed) {
                return (
                  <span
                    key={index}
                    className="bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200 line-through px-0.5 rounded"
                  >
                    {part.value}
                  </span>
                );
              }
              if (part.added) {
                return (
                  <span
                    key={index}
                    className="bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-0.5 rounded"
                  >
                    {part.value}
                  </span>
                );
              }
              return <span key={index}>{part.value}</span>;
            })}
          </p>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-200 dark:bg-red-900/50" />
          <span>Eliminado</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-200 dark:bg-green-900/50" />
          <span>Agregado</span>
        </div>
      </div>
    </div>
  );
}
