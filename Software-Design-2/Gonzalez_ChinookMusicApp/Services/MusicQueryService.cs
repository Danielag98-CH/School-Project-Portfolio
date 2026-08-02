using Gonzalez_ChinookMusicApp.Data;
using Gonzalez_ChinookMusicApp.Models.Dtos;
using Gonzalez_ChinookMusicApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookMusicApp.Services;

public class MusicQueryService {
    private readonly ApplicationDbContext _context;

    public MusicQueryService(ApplicationDbContext context) {
        _context = context;
    }


    public async Task<List<Artist>> GetAllArtistsWithAlbums() {
        return await _context.Artists
            .Include(a => a.Albums)
            .ToListAsync();
    }

    public async Task<List<Artist>> GetAllArtistsWithMoreThanOneAlbum() {
        return await _context.Artists
            .Where(a => a.Albums.Count > 1)
            .Include(a => a.Albums)
            .ToListAsync();
    }


    public async Task<Artist?> GetArtistByNameWithAlbums(string artistName) {
        return await _context.Artists
            .Include(a => a.Albums)
            .FirstOrDefaultAsync(a => a.Name == artistName);
    }

    public async Task<List<Track>> GetTracksByAlbumId(int albumId) {
        return await _context.Tracks
            .Where(t => t.AlbumId == albumId)
            .ToListAsync();
    }

    public async Task<List<Genre>> GetAllGenresWithTracks() {
        return await _context.Genres
            .Include(g => g.Tracks)
            .ToListAsync();
    }

    public async Task<List<Track>> GetTracksByGenreId(int genreId) {
        return await _context.Tracks
            .Where(t => t.GenreId == genreId)
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetTotalTracksByAlbum() {
        return await _context.Albums
            .Select(a => new Statistic {
                Label = a.Title,
                Value = a.Tracks.Count,
                ValueMetric = "Count"
            })
            .ToListAsync();
    }

    public async Task<List<Album>> GetAlbumsByArtistId(int artistId) {
        return await _context.Albums
            .Where(a => a.ArtistId == artistId)
            .ToListAsync();
    }

    public async Task<List<Playlist>> GetAllPlaylistsWithTracks() {
        return await _context.Playlists
            .Include(p => p.Tracks)
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetAverageDurationByGenre() {
        return await _context.Genres
            .Select(g => new Statistic {
                Label = g.Name,
                Value = g.Tracks.Any()
                ? (decimal) g.Tracks.Average(t => t.Milliseconds) / 1000 
                : 0,
                ValueMetric = "Seconds"
            })
            .ToListAsync();
    }

    public async Task<List<Artist>> GetArtistsWithoutAlbums() {
        return await _context.Artists
            .Where(a => !a.Albums.Any())
            .ToListAsync();
    }

    public async Task<List<Track>> GetTracksWithGenreAndAlbum() {
        return await _context.Tracks
            .Include(t => t.Genre)
            .Include(t => t.Album)
            .ToListAsync();
    }

    public async Task<List<TrackDetails>> GetTrackDetails() {
        return await _context.Tracks
            .Include(t => t.Album)
            .ThenInclude(a => a.Artist)
            .Select(t => new TrackDetails {
                Track = t.Name,
                Album  = t.Album.Title,
                Artist = t.Album.Artist.Name 
            })
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetAlbumsWithTrackDuration() {
        return await _context.Albums
            .Select(a => new Statistic {
                Label = a.Title,
                Value = a.Tracks.Sum(t => t.Milliseconds) / 1000m,
                ValueMetric = "Seconds"
            })
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetGenreTrackCounts() {
        return await _context.Genres
            .Select(g => new Statistic {
                Label = g.Name,
                Value = g.Tracks.Count,
                ValueMetric = "Count"
            })
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetPlaylistsWithTrackCount() {
        return await _context.Playlists
            .Select(p => new Statistic {
                Label = p.Name,
                Value = p.Tracks.Count,
                ValueMetric = "Count"
            })
            .ToListAsync();
    }

    public async Task<List<Track>> GetTracksByPlaylistId(int playlistId) {
        return await _context.Playlists
            .Where(p => p.PlaylistId == playlistId)
            .SelectMany(p => p.Tracks)
            .ToListAsync();
    }

    public async Task<Playlist?> GetPlaylistWithMostTracks() {
        return await _context.Playlists
            .OrderByDescending(p => p.Tracks.Count)
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync();
    }

    public async Task<Playlist?> GetPlaylistWithLeastTracks() {
        return await _context.Playlists
            .OrderBy(p => p.Tracks.Count)
            .Include(p => p.Tracks)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Statistic>> GetTopFivePlaylistsWithMostTracks() {
        return await _context.Playlists
            .OrderByDescending(p => p.Tracks.Count)
            .Take(5)
            .Select(p => new Statistic {
                Label = p.Name,
                Value = p.Tracks.Count,
                ValueMetric = "Count"
            })
            .ToListAsync();
    }

    public async Task<List<Statistic>> GetBottomFivePlaylistsWithLeastTracks() {
        return await _context.Playlists
            .OrderBy(p => p.Tracks.Count)
            .Take(5)
            .Select(p => new Statistic {
                Label = p.Name,
                Value = p.Tracks.Count,
                ValueMetric = "Count"
            })
            .ToListAsync();
    }

}
