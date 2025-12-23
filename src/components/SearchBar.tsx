'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Search className="w-5 h-5 text-[#6366f1]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search AI tools..."
        className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-[#d2d2d7]/50 rounded-xl text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all"
      />
    </div>
  );
}
