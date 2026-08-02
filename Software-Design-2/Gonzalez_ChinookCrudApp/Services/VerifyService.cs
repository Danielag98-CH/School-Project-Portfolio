using Gonzalez_ChinookCrudApp.Data;
using Gonzalez_ChinookCrudApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookCrudApp.Services;

public class VerifyService {
    private readonly ApplicationDbContext _context;

    public VerifyService(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<List<Track>> GetTracksByComposerAsync(string composer) {
        return await _context
            .Tracks.Where(t => t.Composer == composer)
            .ToListAsync();
    }

    public async Task<List<Album>> GetAlbumsWithTitleContainingAsync(string subString) {
        return await _context.Albums
            .Where(a => a.Title.Contains(subString))
            .ToListAsync();
    }

    public async Task<Track?> GetTrackByIdAsync(int trackId) {
        return await _context.Tracks.FindAsync(trackId);
    }

}