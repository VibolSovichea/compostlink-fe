interface CategorySliderProps {
  categories: string[];
}

import { useState } from 'react';

const CategorySlider = ({ categories }: CategorySliderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-xl px-4 py-2 border transition-colors cursor-pointer
            ${selectedCategory === category ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"}`}
        >
          {category}
        </div>
      ))}
    </div>
  )
}

export default CategorySlider;
