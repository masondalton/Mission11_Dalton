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

    [HttpGet("GetBooks")]
    public IActionResult GetBooks(int pageSize = 10, int pageNum = 1)
    {
        var books = _bookContext.Books
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

    [HttpGet("GetOrderedBooks")]
    public IEnumerable<Book> GetOrderedBooks()
    {
        var sortedBooks = _bookContext.Books
            .OrderByDescending(x => x.Title)
            .ToList();
            
        return sortedBooks;
    }
}
