import { useState } from "react";
import { Book } from "./types/Book";
import { useEffect } from "react";

// React compeneant for the main page listing all the books
function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [descending, setDescending] = useState<boolean>(false);

  //   Need to dynamically update and mangage the page/display of books based on any changes in
  // number of books, what page they are on, if they are sorting (Total books and sort by aren't editable by user,
  // they help us track for performing operations or backend sorting based on default values)
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Bookstore/GetBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&descending=${descending}`
      );
      const data = await response.json();
      setBooks(data.bookList);
      setTotalBooks(data.numBooks);
      setTotalPages(Math.ceil(data.numBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, descending, totalBooks]);

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

  return (
    // Use general styling here and bootstrap later. Need to make sure entire compenent centered
    <div className="container d-flex justify-content-center">
      <div className="col-md-8">
        <h1 className="text-center">Hilton's Favorite Books</h1>
        <br />

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
              </div>
            </div>
          ))}
        </div>
        {/* This entire next section is for the pagination */}
        <div className="d-flex justify-content-center mt-4">
          <button
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
            className="btn btn-dark mx-1"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPageNum(i + 1)}
              disabled={pageNum === i + 1}
              className={`btn mx-1 ${pageNum === i + 1 ? "btn-secondary" : "btn-dark"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
            className="btn btn-dark mx-1"
          >
            Next
          </button>
        </div>
        {/* This section gives users ability to change how many books appear on the page dynamically */}
        <div className="text-center mt-4">
          <label>
            Results per page:
            <select
              value={pageSize}
              onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1);
              }}
              className="form-select d-inline-block ms-2"
              style={{ width: "auto" }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default BookList;
