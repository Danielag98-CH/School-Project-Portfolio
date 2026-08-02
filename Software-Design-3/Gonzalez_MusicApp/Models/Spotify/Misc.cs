using System.Text.Json.Serialization;


namespace Gonzalez_MusicApp.Models.Spotify;

public class ImageObject {
    [JsonPropertyName("items")]
    public string Url { get; set; }
    [JsonPropertyName("height")]
    public int Height { get; set; }
    [JsonPropertyName("width")]
    public int Width { get; set; }
}

public class ExternalUrls {
    [JsonPropertyName("spotify")]
    public string Spotify { get; set; }
}