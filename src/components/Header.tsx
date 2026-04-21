'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { tools } from '@/data/tools';

const LOGO_SIZE = 36;

export default function Header() {
  const featuredTools = tools.slice(0, 12);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-bg-surface/80 border-b border-border-subtle supports-[backdrop-filter]:bg-bg-surface/70"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-4 min-h-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
            aria-label="SystemPrompts home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-sm sm:text-base font-semibold text-text-primary tracking-tight leading-none">
              SystemPrompts
            </span>
          </Link>

          <div
            className="hidden sm:block w-px h-6 bg-border-subtle shrink-0"
            aria-hidden
          />

          <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-0.5 [-webkit-overflow-scrolling:touch]">
            {featuredTools.map((tool, index) => (
              <motion.a
                key={tool.id}
                href={`/tool/${tool.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-1.5 sm:gap-2 shrink-0 opacity-80 hover:opacity-100 transition-opacity first:pl-0 sm:first:pl-0"
                title={tool.name}
              >
                <Image
                  src={tool.logo}
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain sm:w-6 sm:h-6"
                  unoptimized
                />
                <span className="text-xs sm:text-sm text-text-secondary font-medium hidden md:inline max-w-[8rem] truncate">
                  {tool.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
