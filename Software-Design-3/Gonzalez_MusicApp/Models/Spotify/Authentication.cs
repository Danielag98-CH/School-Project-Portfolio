using System.Text.Json.Serialization;

namespace Gonzalez_MusicApp.Models.Spotify;

public class SpotifyTokenResponse {
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
    public DateTime AcquiredAt { get; set; }

    public bool IsExpired(int bufferSeconds = 60) {
        /*
            If we are 60 seconds or less from the ExpiresIn time,
            then we can consider this token expired. This will
            give us some buffer so that we do not have a situation
            where the token expires in 1 or 2 seconds, for example, the
            request is sent off and by the time the request is processed
            by Spotify, the token has actually expired. Giving a
            60 second buffer is plenty of leeway time to avoid
            this situation which would cause the request to fail.
        */
        var expiry = AcquiredAt.AddSeconds(ExpiresIn - bufferSeconds);
        return DateTime.UtcNow >= expiry;
    }
}