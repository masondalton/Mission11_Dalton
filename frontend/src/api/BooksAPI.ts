import { Book } from "../types/Book";

interface FetchBooksResponse {
  bookList: Book[];
  numBooks: number;
}

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
      `https://localhost:5000/api/Bookstore/GetBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&descending=${descending}${selectedCategories.length ? `&${categoryParams}` : ``}`
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
