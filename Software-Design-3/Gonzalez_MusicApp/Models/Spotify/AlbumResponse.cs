using System.Text.Json.Serialization;
namespace Gonzalez_MusicApp.Models.Spotify;

public class AlbumResponse {
    [JsonPropertyName("albums")]
    public Albums Albums { get; set; }
}

public class Albums {
    [JsonPropertyName("href")]
    public string Href { get; set; }
    [JsonPropertyName("limit")]
    public int Limit { get; set; }
    [JsonPropertyName("next")]
    public string? Next { get; set; }
    [JsonPropertyName("offset")]
    public int Offset { get; set; }
    [JsonPropertyName("previous")]
    public int? Previous { get; set; }
    [JsonPropertyName("total")]
    public int Total { get; set; }
    [JsonPropertyName("items")]
    public List<SimplifiedAlbumObject> Items { get; set; } = new List<SimplifiedAlbumObject>();
}

public class SimplifiedAlbumObject {
    [JsonPropertyName("album_type")]
    public string AlbumType { get; set; }
    [JsonPropertyName("total_tracks")]
    public int TotalTracks { get; set; }
    [JsonPropertyName("available_markets")]
    public List<string> AvailableMarkets { get; set; } = new List<string>();
    [JsonPropertyName("external_urls")]
    public ExternalUrls ExternalUrls { get; set; }
    [JsonPropertyName("href")]
    public string Href { get; set; }
    [JsonPropertyName("id")]
    public string Id { get; set; }
    [JsonPropertyName("images")]
    public List<ImageObject> Images { get; set; } = new List<ImageObject>();
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; }
    [JsonPropertyName("release_date_precision")]
    public string ReleaseDatePrecision { get; set; }
    [JsonPropertyName("restrictions")]
    public Restrictions Restrictions { get; set; }
    [JsonPropertyName("type")]
    public string Type { get; set; }
    [JsonPropertyName("uri")]
    public string Uri { get; set; }
    [JsonPropertyName("artists")]
    public List<SimplifiedArtistObject> Artists { get; set; } = new List<SimplifiedArtistObject>();
}

public class Restrictions {
    [JsonPropertyName("reason")]
    public string Reason { get; set; }
}