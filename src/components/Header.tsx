'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { tools } from '@/data/tools';

export default function Header() {
  const featuredTools = tools.slice(0, 12);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#d2d2d7]/50"
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide">
          {featuredTools.map((tool, index) => (
            <motion.a
              key={tool.id}
              href={`/tool/${tool.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              title={tool.name}
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={24}
                height={24}
                className="object-contain"
                unoptimized
              />
              <span className="text-sm text-[#1d1d1f] font-medium hidden lg:inline">
                {tool.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
