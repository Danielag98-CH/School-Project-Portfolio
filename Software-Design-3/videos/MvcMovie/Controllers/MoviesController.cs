using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;
using MvcMovie.Models;

namespace MvcMovie.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public MoviesController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<Movie>>> GetAllMovies() {
            return Ok(await _context.Movies.ToListAsync());
        }

        [HttpPost("")]
        public async Task<ActionResult<Movie>> CreateMovie(Movie newMovie) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(newMovie);

            await _context.SaveChangesAsync();

            return Ok(newMovie);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, [Bind("Id,Title,ReleaseDate,Genre,Price")] Movie movieDetails) {
            if (id != movieDetails.Id) {
                return NotFound();
            }

            if (!ModelState.IsValid) {
                // Returning bad request response with the validation errors.                
                return BadRequest(ModelState);
            }

            Movie existingMovie = await _context.Movies.SingleAsync();

            if (null == existingMovie) {
                return NotFound($"No movie found with ID: {id}");
            }

            _context.Update(existingMovie);

            return Ok(existingMovie);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetMovieById(int? id) {
            if (id == null) {
                return NotFound("A valid movie ID was not supplied.");
            }

            var movie = await _context.Movies.FindAsync(id);

            if (null == movie) {
                return NotFound($"No movie found with ID: {id}");
            }

            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id) {
            Movie? movie = await _context.Movies.FindAsync(id);

            if (null == movie) {
                return NotFound($"No movie found with ID: {id}");
            }

            _context.Movies.Remove(movie);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
