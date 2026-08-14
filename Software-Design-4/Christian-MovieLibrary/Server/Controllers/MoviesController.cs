using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers {

  [Route("api/[controller]")]
  [ApiController]
  public class MoviesController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public MoviesController(ApplicationDbContext context) {
      _context = context;
    }

    // GET: api/movies
    [HttpGet("")]
    public async Task<ActionResult<ICollection<Movie>>> GetMovies() {
      
      return Ok(await _context.Movies.ToListAsync());
    
    }

    // GET: api/movies/5
    [HttpGet("{movieId}")]
    public async Task<ActionResult<Movie>> GetMovie(int movieId) {

      Movie? movie = await _context.Movies.FindAsync(movieId);

      if (movie == null) {
        
        return NotFound($"Movie with ID {movieId} was not found.");
      
      }

      return Ok(movie);

    }

    // GET: api/movies/search?title=value
    [HttpGet("search")]
    public async Task<ActionResult<ICollection<Movie>>> SearchMovies([FromQuery] string title) {
      
      if (string.IsNullOrWhiteSpace(title)) {
       
        return Ok(new List<Movie>());
      
      }

      string loweredTitle = title.ToLower();

      List<Movie> matchingMovies = await _context.Movies
        .Where(m => m.Title.ToLower().Contains(loweredTitle))
        .ToListAsync();

      return Ok(matchingMovies);
    }
  }
}