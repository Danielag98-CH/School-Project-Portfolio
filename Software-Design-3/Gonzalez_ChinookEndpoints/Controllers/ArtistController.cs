using Gonzalez_ChinookEndpoints.Data;
using Gonzalez_ChinookEndpoints.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEndpoints.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class ArtistController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public ArtistController(ApplicationDbContext context) {
      _context = context;
    }

    // GET: api/artist
    // Return a list of all artists with 200 OK.
    [HttpGet]
    public async Task<IActionResult> GetAllArtist() {
      var artist = await _context.Artists.ToListAsync();
      return Ok(artist);
    }

    // GET: api/artist/{artistId}
    // Return artist by id, or 404 if not found.
    [HttpGet("{artistId:int}")]
    public async Task<IActionResult> GetArtistById(int artistId) {
      if (artistId <= 0) {
        return BadRequest("Artist ID must be a positive integer.");
      }

      var artist = await _context.Artists.FindAsync(artistId);

      if (artist == null) {
        return NotFound($"No artist with ID {artistId} can be found.");
      }

      return Ok(artist);
    }

    // DELETE: api/artist/{artistId}
    // Delete artist if exists. 204 if deleted, 404 if not found.
    [HttpDelete("{artistId:int}")]
    public async Task<IActionResult> DeleteArtist(int artistId) {
      if (artistId <= 0) {
        return BadRequest("Artist ID must be a positive integer.");
      }

      var artist = await _context.Artists.FindAsync(artistId);

      if (artist == null) {
        return NotFound($"No artist with ID {artistId} can be found.");
      }

      _context.Artists.Remove(artist);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    // GET: api/artist/stats
    // - numAlbumsFromArtist is required and must be > 0
    // - If <= 0 => 400 BadRequest
    // - Sort artists by Album count desc, take top N, return 200 OK
    [HttpGet("stats")]
    public async Task<IActionResult> GetArtistStats([FromQuery] int? numAlbumsFromArtist) {
      if (numAlbumsFromArtist is null) {
        return BadRequest("Query parameter 'numAlbumsFromArtist' is required.");
      }

      if (numAlbumsFromArtist <= 0) {
        return BadRequest("Query parameter 'numAlbumFromArtist' must be a positive integer.");
      }

      var topArtist = await _context.Artists
        .Select(a => new {
          a.ArtistId,
          a.Name,
          AlbumsCount = a.Albums.Count
        })
        .OrderByDescending(a => a.AlbumsCount)
        .Take(numAlbumsFromArtist.Value)
        .ToListAsync();

      return Ok(topArtist);
    }
  }
}
