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
      <Link href={`/tool/${tool.id}`}>
        <div className="group relative h-full card-hover">
          <div className="relative h-full bg-white/80 backdrop-blur-sm border border-[#d2d2d7]/50 rounded-2xl p-6 hover:border-[#86868b] hover:bg-white transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
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
                  <span className="text-lg font-bold text-[#1d1d1f]">
                    {tool.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="category-pill">
                {tool.category}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-[#86868b] mb-4 line-clamp-2">
              {tool.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                <FileText className="w-3.5 h-3.5" />
                <span>{promptCount} prompt{promptCount !== 1 ? 's' : ''}</span>
              </div>
              {toolsCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{toolsCount} tool{toolsCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-medium text-[#0071e3] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View prompts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
