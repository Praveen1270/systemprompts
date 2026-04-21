'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Wrench, ArrowRight } from 'lucide-react';
import type { AITool } from '@/data/tools';
import { useState } from 'react';

interface ToolCardProps {
  tool: AITool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  const promptCount = tool.files.filter(f => f.type === 'prompt').length;
  const toolsCount = tool.files.filter(f => f.type === 'tools').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/tool/${tool.id}`} className="block h-full">
        <div className="group relative h-full glow-card">
          <div className="relative h-full glass-panel rounded-2xl p-5 sm:p-6 border border-border-subtle transition-all duration-300 hover:shadow-md hover:border-accent-primary/25">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-border-subtle bg-bg-base">
                {!imageError ? (
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <span className="text-lg font-bold text-accent-primary">
                    {tool.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="category-pill">
                {tool.category}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <FileText className="w-3.5 h-3.5 text-accent-primary/80" />
                <span>{promptCount} prompt{promptCount !== 1 ? 's' : ''}</span>
              </div>
              {toolsCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Wrench className="w-3.5 h-3.5 text-accent-secondary/80" />
                  <span>{toolsCount} tool{toolsCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View prompts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
