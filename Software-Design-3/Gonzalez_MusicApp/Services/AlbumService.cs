using System.Text.Json;
using System.Text;
using Gonzalez_MusicApp.Models.Spotify;
using Gonzalez_MusicApp.Services;

public class AlbumService {
  private readonly SpotifyApiService _spotifyApiService;

  public AlbumService(SpotifyApiService spotifyApiService) {
    _spotifyApiService = spotifyApiService;
  }

  public async Task<AlbumResponse?> GetNewReleaseAlbumsAsync() {
    var json = await _spotifyApiService.GetNewReleasesAsync();

    if (string.IsNullOrEmpty(json)) {
      return null;
    }

    var albums = JsonSerializer.Deserialize<AlbumResponse>(
      json,
      new JsonSerializerOptions {
        PropertyNameCaseInsensitive = true
      });

    return albums;
  }
}





