using Bookstore.API.Data;

namespace Bookstore.API.Controllers;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class BookstoreController : ControllerBase
{

    private BookstoreContext _bookContext;
    public BookstoreController(BookstoreContext temp)
    {
        _bookContext = temp;
    }

    // Main get request for the list of all the books. Pass back total number for pagination calculations
    [HttpGet("GetBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "default", bool descending = false, [FromQuery] List<string>? bookCats = null)
    {
        var booksQuery = _bookContext.Books.AsQueryable();

        if (bookCats != null && bookCats.Any())
        {
            booksQuery = booksQuery.Where(b => bookCats.Contains(b.Category));
        }
    
        // Apply sorting
        switch (sortBy.ToLower())
        {
            case "title":
                booksQuery = descending 
                    ? booksQuery.OrderByDescending(x => x.Title)
                    : booksQuery.OrderBy(x => x.Title);
                break;
            // Add other cases for additional sort fields if needed
            default:
                // Default sort
                booksQuery = booksQuery.OrderBy(x => x.BookId);
                break;
        }
        var totalNumBooks = booksQuery.Count();
        
        var books = booksQuery
            .Skip((pageNum-1) * pageSize)
            .Take(pageSize)
            .ToList();

        var combinedObj = new
        {
            bookList = books,
            numBooks = totalNumBooks
        };
    
        return Ok(combinedObj);
    }

    // Enables access to book genres to enable user to filter on each one.
    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookCategories = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookCategories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _bookContext.Books.Add(book);
        _bookContext.SaveChanges();
        return Ok(book);
    }

    [HttpPut("UpdateBook/{bookId}")]

    public IActionResult UpdateBook(int bookId, [FromBody] Book book)
    {
        var existingBook = _bookContext.Books.Find(bookId);
        
        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Publisher = book.Publisher;
        existingBook.ISBN = book.ISBN;
        existingBook.Classification = book.Classification;
        existingBook.Category = book.Category;
        existingBook.PageCount = book.PageCount;
        existingBook.Price = book.Price;

        _bookContext.Books.Update(existingBook);
        _bookContext.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var existingBook = _bookContext.Books.Find(bookId);

        if (existingBook == null)
        {
            return NotFound(new {message = "Book not found"});
        }
        _bookContext.Books.Remove(existingBook);
        _bookContext.SaveChanges();
        return Ok(new { message = "Book deleted successfully" });
    }
    
}
