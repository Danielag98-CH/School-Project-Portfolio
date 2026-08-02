using Gonzalez_ChinookEndpoints.Data;
using Gonzalez_ChinookEndpoints.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEndpoints.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public AlbumController(ApplicationDbContext context) {
            _context = context;
        }

        //Get: api/album
        //Return a list of all albums with a 200 OK status.
        [HttpGet("")]
        public async Task<ActionResult<List<Album>>> GetAllAlbums() {
            var albums = await _context.Albums.ToListAsync();

            return Ok(albums);
        }

        // GET: api/album/{albumId}
        //Return album by id, or 404 if not found.
        [HttpGet("{albumId:int}")]
        public async Task<ActionResult<Album>> GetAlbumById(int albumId) {
            var album = await _context.Albums
                .Include(al => al.Artist)
                .Include(al => al.Tracks)
                .SingleOrDefaultAsync(al => al.AlbumId == albumId);

            if (album == null) {
                return NotFound($"No Album found with ID: {album}");
            }

            return Ok(album);
        }

        // DELETE: api/album/{albumId}
        // Delete album if exists. 204 if deleted, 404 if not found.
        [HttpDelete("{albumId:int}")]
        public async Task<IActionResult> DeleteAlbum(int albumId) {
            if (albumId <= 0) {
                return BadRequest("Album ID must be a positive integer.");
            }

            var album = await _context.Albums.FindAsync(albumId);

            if (album == null) {
                return NotFound($"No album with ID {albumId} can be found.");
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

        // 204 No Content as required
            return NoContent();
        }

        //Get: Search for album by title or artistName
        [HttpGet("search")]
        public async Task<IActionResult> SearchAlbum(
            [FromQuery] string? title,
            [FromQuery] string? artistName) {
                bool hasTitle = !string.IsNullOrEmpty(title);
                bool hasArtist = !string.IsNullOrEmpty(artistName);

            if (!hasTitle && !hasArtist) {
                return NotFound("No search parameters were supplied. Provide either 'title' or 'artistName'.");
            }

            if (hasTitle && hasArtist) {
                return BadRequest("Only one type of search is allowed at a time. Provide either 'title' or 'artistName', but not both.");
            }

            List<Album> results;

            if (hasTitle) {
                string normalizedTitle = title!.Trim().ToLower();

                results = await _context.Albums
                .Where(a => a.Title.ToLower() == normalizedTitle)
                .ToListAsync();

            if (results.Count == 0) {
                return NotFound($"No albums were found with the title '{title}'.");
            }

            return Ok(results);
            } else {
                string normalizedArtist = artistName!.Trim().ToLower();

                results = await _context.Albums
                .Where(a => a.Artist.Name.ToLower() == normalizedArtist)
                .ToListAsync();

            if (results.Count == 0) {
                return NotFound($"No albums were found for the artist '{artistName}'.");
            }

            return Ok(results);
            }
        }

        //Get: albums by Artist 
        [HttpGet("albums-by-artist")]
        public async Task<IActionResult> GetAlbumByArtist() {
        var grouped = await _context.Albums
            .GroupBy(a => a.Artist.Name)
            .ToDictionaryAsync(
                g => g.Key,
                g => g
                .Select(a => new {
                a.AlbumId,
                a.Title
                })
            .ToList()
            );

            return Ok(grouped);
        }
  
    
    }
}