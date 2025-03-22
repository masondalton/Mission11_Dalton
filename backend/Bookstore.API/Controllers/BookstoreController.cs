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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "default", bool descending = false)
    {
        var booksQuery = _bookContext.Books.AsQueryable();
    
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
    
        var books = booksQuery
            .Skip((pageNum-1) * pageSize)
            .Take(pageSize)
            .ToList();
    
        var totalNumBooks = _bookContext.Books.Count();

        var combinedObj = new
        {
            bookList = books,
            numBooks = totalNumBooks
        };
    
        return Ok(combinedObj);
    }
    
}
