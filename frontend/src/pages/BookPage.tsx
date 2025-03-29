import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeHead from "../components/WelcomeHead";

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <div className="row">
        <WelcomeHead />
      </div>

      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookPage;
