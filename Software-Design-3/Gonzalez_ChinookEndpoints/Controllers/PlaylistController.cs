using Gonzalez_ChinookEndpoints.Data;
using Gonzalez_ChinookEndpoints.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEndpoints.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class PlaylistController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public PlaylistController(ApplicationDbContext context) {
      _context = context;
    }

    // GET: api/playlist
    // Get all playlists
    [HttpGet]
    public async Task<IActionResult> GetAllPlaylist() {
      var playlist = await _context.Playlists.ToListAsync();
      return Ok(playlist);
    }

    // GET: api/playlist/{playlistId}
    // Get playlist by ID
    [HttpGet("{playlistId:int}")]
    public async Task<IActionResult> GetPlaylistById(int playlistId) {
      if (playlistId <= 0) {
        return BadRequest("Playlist ID must be a positive integer.");
      }

      var playlist = await _context.Playlists.FindAsync(playlistId);

      if (playlist == null) {
        return NotFound($"No playlist with ID {playlistId} can be found.");
      }

      return Ok(playlist);
    }

    // DELETE: api/playlist/{playlistId}
    // Delete playlist by ID
    [HttpDelete("{playlistId:int}")]
    public async Task<IActionResult> DeletePlaylist(int playlistId) {
      if (playlistId <= 0) {
        return BadRequest("Playlist ID must be a positive integer.");
      }

      var playlist = await _context.Playlists.FindAsync(playlistId);

      if (playlist == null) {
        return NotFound($"No playlist with ID {playlistId} can be found.");
      }

      _context.Playlists.Remove(playlist);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    // GET: api/playlist/
    [HttpGet("top-expensive")]
    public async Task<IActionResult> GetTopExpensivePlaylist([FromQuery] int? numTopExpensive) {
      if (numTopExpensive is null || numTopExpensive <= 0) {
        return BadRequest("Query parameter 'numTopExpensive' is required and must be greater than 0.");
      }

      var topNum = numTopExpensive.Value;

      var topPlaylist = await _context.Playlists
        .AsNoTracking()
        .Select(p => new {
          p.PlaylistId,
          p.Name,
          TotalPrice = p.Tracks.Sum(t => t.UnitPrice)
        })
        .OrderByDescending(p => p.TotalPrice)
        .Take(topNum)
        .ToListAsync();

      return Ok(topPlaylist);
    }
  }
}
