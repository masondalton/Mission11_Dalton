import { Book } from "../types/Book";

interface FetchBooksResponse {
  bookList: Book[];
  numBooks: number;
}

const API_URL =
  "https://bookstoredalton-backend.azurewebsites.net/api/Bookstore/";

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortBy: string,
  descending: boolean
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCats=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}GetBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&descending=${descending}${selectedCategories.length ? `&${categoryParams}` : ``}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    return await response.json();
  } catch (err) {
    console.error("Error adding book", err);
    throw err;
  }
};

export const editBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}UpdateBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error("Failed to update the book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating project", error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}DeleteBook/${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};
