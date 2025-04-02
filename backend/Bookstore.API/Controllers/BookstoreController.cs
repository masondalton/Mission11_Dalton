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
    
    public IActionResult
    
}
