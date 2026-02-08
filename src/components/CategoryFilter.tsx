'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5 p-1">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => onSelect(null)}
        className={`btn-premium px-4 py-2 font-technical uppercase tracking-widest text-[10px] ${selected === null ? 'active' : ''}`}
      >
        [ ALL_UNITS ]
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(category)}
          className={`btn-premium px-4 py-2 font-technical uppercase tracking-widest text-[10px] ${selected === category ? 'active' : ''}`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
