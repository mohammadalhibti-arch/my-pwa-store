import { categories } from "../data/products";
import { Category } from "../types";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category: Category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}