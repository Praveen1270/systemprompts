'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(null)}
        className={`category-pill ${selected === null ? 'active' : ''}`}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(category)}
          className={`category-pill ${selected === category ? 'active' : ''}`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
