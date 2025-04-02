import { useState } from "react";
import { Book } from "../types/Book";

const NewBookForm = () => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  return (
    <form>
      <h2>Add New Book</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </label>
      <br />
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
        />
      </label>
      <br />
      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        />
      </label>
      <br />
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </label>
      <br />
      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={(e) => setFormData({ ...formData, pageCount: Number(e.target.value) })}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        />
      </label>
      <br />
      <button type="submit">Add Book</button>
      <button type="button">Cancel</button>
    </form>
  );
};

export default NewBookForm;
