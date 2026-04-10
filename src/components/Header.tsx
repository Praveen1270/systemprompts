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
      className="sticky top-0 z-50 backdrop-blur-xl bg-bg-base/85 border-b border-border-subtle"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-0.5 [-webkit-overflow-scrolling:touch]">
          {featuredTools.map((tool, index) => (
            <motion.a
              key={tool.id}
              href={`/tool/${tool.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-1.5 sm:gap-2 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
              title={tool.name}
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={22}
                height={22}
                className="object-contain sm:w-6 sm:h-6"
                unoptimized
              />
              <span className="text-xs sm:text-sm text-text-secondary font-medium hidden sm:inline max-w-[8rem] truncate">
                {tool.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
