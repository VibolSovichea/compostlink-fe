interface CategorySliderProps {
  categories: string[];
}

const CategorySlider = ({ categories }: CategorySliderProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <div key={category} className="bg-primary rounded-xl px-4 py-2">
          {category}
        </div>
      ))}
    </div>
  )
}

export default CategorySlider;
