import { useState } from "react";
import { Book } from "../types/Book";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

// React compeneant for the main page listing all the books
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [descending, setDescending] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //   Need to dynamically update and mangage the page/display of books based on any changes in
  // number of books, what page they are on, if they are sorting (Total books and sort by aren't editable by user,
  // they help us track for performing operations or backend sorting based on default values)
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          sortBy,
          descending
        );

        setBooks(data.bookList);
        setTotalPages(Math.ceil(data.numBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, descending, selectedCategories]);

  // If the user desires, this handles sorting by title
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setDescending(!descending);
    } else {
      setSortBy(field);
      setDescending(false);
    }
    setPageNum(1);
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    // Use general styling here and bootstrap later. Need to make sure entire compenent centered
    <>
      <div className="bg-dark text-white p-2 mb-4">
        <button
          onClick={() => handleSort("title")}
          className="btn btn-link text-white p-0 fw-bold"
        >
          Sort by Title {sortBy === "title" && (descending ? "↓" : "↑")}
        </button>
      </div>

      {/* Uses bootstrap styling here for the cards and boook info */}
      <div className="book-list">
        {books.map((b) => (
          <div id="bookCard" className="card mb-3" key={b.bookId}>
            <h3 className="card-title p-3 pb-0">{b.title}</h3>
            <div className="card-body pt-2">
              <ul className="list-unstyled">
                <li>
                  <strong>Author:</strong> {b.author}
                </li>
                <li>
                  <strong>Publisher:</strong> {b.publisher}
                </li>
                <li>
                  <strong>ISBN:</strong> {b.isbn}
                </li>
                <li>
                  <strong>Classification:</strong> {b.classification}
                </li>
                <li>
                  <strong>Category:</strong> {b.category}
                </li>
                <li>
                  <strong>Page Count:</strong> {b.pageCount}
                </li>
                <li>
                  <strong>Price:</strong> ${b.price.toFixed(2)}
                </li>
              </ul>
              {/* Here I need to send relevant info for the book to help add the correct information to cart (title, id, price) */}
              <button
                className="btn btn-success"
                onClick={() =>
                  navigate(`/AddToCartPage/${b.title}/${b.bookId}/${b.price}`)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
