import { useEffect, useState } from "react";
import "./CategoryFilter.css";

// Manage the use of category filters by get the selected categories from database
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
        // Attempt to get the list of categories, unique - no duplicates.
        // Then I pass the retrieved categories to a string list via set categories function
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

  // Pulled out of return for clarity. Take the cateogory list and fixes value based of user preferences for book genre
  function handleCheckBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Book Genres</h5>
      {/* Filters by book genre/category */}
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
