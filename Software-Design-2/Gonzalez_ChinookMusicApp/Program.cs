using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Gonzalez_ChinookMusicApp.Data;
using Gonzalez_ChinookMusicApp.Services;

ServiceProvider serviceProvider;
MusicQueryService _musicQueryService;


var services = new ServiceCollection();



services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=chinook.db"));


services.AddScoped<MusicQueryService>();
services.AddScoped<SeedingService>();

serviceProvider = services.BuildServiceProvider();

// await using 
serviceProvider = services.BuildServiceProvider();
    // try {
var seeder = serviceProvider.GetRequiredService<SeedingService>();

Console.WriteLine("Starting DB seeding...");
await seeder.SeedDatabase();
Console.WriteLine("Finished DB seeding.");

_musicQueryService = serviceProvider.GetRequiredService<MusicQueryService>();


Console.WriteLine("\n--- GetAllArtistsWithAlbums ---");
var artistsWithAlbums = await _musicQueryService.GetAllArtistsWithAlbums();
foreach (var artist in artistsWithAlbums) {
    Console.WriteLine($"{artist.Name} ({artist.Albums.Count} albums)");
}

Console.WriteLine("\n--- GetAllArtistsWithMoreThanOneAlbum ---");
var artistsWithMoreThanOneAlbum = await _musicQueryService.GetAllArtistsWithMoreThanOneAlbum();
foreach (var artist in artistsWithMoreThanOneAlbum) {
    Console.WriteLine($"{artist.Name} ({artist.Albums.Count} albums)");
}

Console.WriteLine("\n--- GetArtistByNameWithAlbums ---");
var artistByName = await _musicQueryService.GetArtistByNameWithAlbums("AC/DC");
Console.WriteLine(artistByName != null
    ? $"{artistByName.Name} has {artistByName.Albums.Count} albums"
    : "Artist not found");

Console.WriteLine("\n--- GetTracksByAlbumId (AlbumId = 1) ---");
var tracksByAlbum = await _musicQueryService.GetTracksByAlbumId(1);
foreach (var track in tracksByAlbum) {
    Console.WriteLine(track.Name);
}

Console.WriteLine("\n--- GetAllGenresWithTracks ---");
var genresWithTracks = await _musicQueryService.GetAllGenresWithTracks();
foreach (var genre in genresWithTracks) {
    Console.WriteLine($"{genre.Name} ({genre.Tracks.Count} tracks)");
}

Console.WriteLine("\n--- GetTracksByGenreId (GenreId = 1) ---");
var tracksByGenre = await _musicQueryService.GetTracksByGenreId(1);
foreach (var track in tracksByGenre) {
    Console.WriteLine(track.Name);
}

Console.WriteLine("\n--- GetTotalTracksByAlbum ---");
var totalTracksByAlbum = await _musicQueryService.GetTotalTracksByAlbum();
foreach (var stat in totalTracksByAlbum) {
    Console.WriteLine($"{stat.Label}: {stat.Value} tracks");
}

Console.WriteLine("\n--- GetAlbumsByArtistId (ArtistId = 1) ---");
var albumsByArtist = await _musicQueryService.GetAlbumsByArtistId(1);
foreach (var album in albumsByArtist) {
    Console.WriteLine(album.Title);
}

Console.WriteLine("\n--- GetAllPlaylistsWithTracks ---");
var playlistsWithTracks = await _musicQueryService.GetAllPlaylistsWithTracks();
foreach (var playlist in playlistsWithTracks) {
    Console.WriteLine($"{playlist.Name} ({playlist.Tracks.Count} tracks)");
}

Console.WriteLine("\n--- GetAverageDurationByGenre ---");
var avgDurationByGenre = await _musicQueryService.GetAverageDurationByGenre();
foreach (var stat in avgDurationByGenre) {
    Console.WriteLine($"{stat.Label}: {stat.Value} {stat.ValueMetric}");
}

Console.WriteLine("\n--- GetArtistsWithoutAlbums ---");
var artistsWithoutAlbums = await _musicQueryService.GetArtistsWithoutAlbums();
foreach (var artist in artistsWithoutAlbums) {
    Console.WriteLine(artist.Name);
}

Console.WriteLine("\n--- GetTracksWithGenreAndAlbum ---");
var tracksWithGenreAndAlbum = await _musicQueryService.GetTracksWithGenreAndAlbum();
foreach (var track in tracksWithGenreAndAlbum) {
    Console.WriteLine($"{track.Name} - {track.Album?.Title} ({track.Genre?.Name})");
}

Console.WriteLine("\n--- GetTrackDetails ---");
var trackDetails = await _musicQueryService.GetTrackDetails();
foreach (var detail in trackDetails) {
    Console.WriteLine($"{detail.Track} - {detail.Album} by {detail.Artist}");
}

Console.WriteLine("\n--- GetAlbumsWithTrackDuration ---");
var albumDurations = await _musicQueryService.GetAlbumsWithTrackDuration();
foreach (var stat in albumDurations) {
    Console.WriteLine($"{stat.Label}: {stat.Value} {stat.ValueMetric}");
}

Console.WriteLine("\n--- GetGenreTrackCounts ---");
var genreTrackCounts = await _musicQueryService.GetGenreTrackCounts();
foreach (var stat in genreTrackCounts) {
    Console.WriteLine($"{stat.Label}: {stat.Value}");
}

Console.WriteLine("\n--- GetPlaylistsWithTrackCount ---");
var playlistStats = await _musicQueryService.GetPlaylistsWithTrackCount();
foreach (var stat in playlistStats) {
    Console.WriteLine($"{stat.Label}: {stat.Value}");
}

Console.WriteLine("\n--- GetTracksByPlaylistId (PlaylistId = 1) ---");
var tracksInPlaylist = await _musicQueryService.GetTracksByPlaylistId(1);
foreach (var track in tracksInPlaylist) {
    Console.WriteLine(track.Name);
}

Console.WriteLine("\n--- GetPlaylistWithMostTracks ---");
var mostTracksPlaylist = await _musicQueryService.GetPlaylistWithMostTracks();
Console.WriteLine($"{mostTracksPlaylist?.Name} ({mostTracksPlaylist?.Tracks.Count} tracks)");

Console.WriteLine("\n--- GetPlaylistWithLeastTracks ---");
var leastTracksPlaylist = await _musicQueryService.GetPlaylistWithLeastTracks();
Console.WriteLine($"{leastTracksPlaylist?.Name} ({leastTracksPlaylist?.Tracks.Count} tracks)");

Console.WriteLine("\n--- GetTopFivePlaylistsWithMostTracks ---");
var top5Stats = await _musicQueryService.GetTopFivePlaylistsWithMostTracks();
foreach (var stat in top5Stats) {
    Console.WriteLine($"{stat.Label}: {stat.Value} tracks");
}

Console.WriteLine("\n--- GetBottomFivePlaylistsWithLeastTracks ---");
var bottom5Stats = await _musicQueryService.GetBottomFivePlaylistsWithLeastTracks();
foreach (var stat in bottom5Stats) {
    Console.WriteLine($"{stat.Label}: {stat.Value} tracks");
}


   