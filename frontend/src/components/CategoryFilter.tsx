import { useEffect, useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/api/Bookstore/GetBookCategories"
        );
        const data = await response.json();

        setCategories(data);
        console.log("fetched categories", data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {categories.map((cats) => (
          <div key={cats} className="category-item">
            <input
              type="checkbox"
              id={cats}
              value={cats}
              className="category-checkbox"
              onChange={handleCheckBoxChange}
            />
            <label htmlFor={cats}>{cats}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
