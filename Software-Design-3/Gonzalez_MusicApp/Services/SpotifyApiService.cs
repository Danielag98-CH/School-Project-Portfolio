using System.Text.Json;
using System.Text;
using RestSharp;
using RestSharp.Authenticators;
using Gonzalez_MusicApp.Models.Spotify;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Gonzalez_MusicApp.Services;

public class SpotifyApiService {
    private readonly RestClient _authClient;
    private readonly RestClient _apiClient;

    private readonly string? _authBaseUrl;
    private readonly string? _apiBaseUrl;

    private readonly string? _clientId;
    private readonly string? _clientSecret;
    private readonly string? _EncodedClientInfo; //jacob's code//
    private readonly string? _authToken;

    private SpotifyTokenResponse? _accessTokenResponse;

    public SpotifyApiService(IConfiguration config) {

        //jacobs code//
        _authBaseUrl = config["Spotify:AuthBaseUrl"];
        _apiBaseUrl = config["Spotify:BaseUrl"];
       
        _clientId = config["ClientId"];
        _clientSecret = config["ClientSecret"];

        _encodedClientInfo = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{_clientId}:{_clientSecret}"));

        _authClient = new RestClient(_authBaseUrl);
        _apiClient = new RestClient(_apiBaseUrl);

        //my code
        // if (string.IsNullOrEmpty(_clientId) ||
        //     string.IsNullOrEmpty(_clientSecret)) {
        // throw new InvalidOperationException(
        //     "ClientId or ClientSecret is not configured.");
        // }
    
        // _authClient = new RestClient("https://accounts.spotify.com/api/");
        // _apiClient = new RestClient("https://api.spotify.com/v1/");

        // // Build Basic auth header value: base64(clientId:clientSecret)
        // var authBytes = Encoding.UTF8.GetBytes($"{_clientId}:{_clientSecret}");
        // _authToken = Convert.ToBase64String(authBytes);//found this code but unsure of the exact usage

    }

    //Jacobs code//
    public async Task<SpotifyTokenResponse> RequestNewAccessToken() {
        var request = new RestRequest($"/token", Method.Post)
            .AddHeader("Authorization", $"Basic {_EncodedClientInfo}")
            .AddHeader("Content-Type", "application/x-www-form-urlencoded")
            .AddParameter("grant_type", "client_credentials");
       
        var response = await _authClient.ExecuteAsync(request);

        if (!response.IsSuccessStatusCode) {
            Console.WriteLine($"\n\nRESPONSE STATUS:\n\n{response.StatusCode}");
            Console.WriteLine($"\n\nErrorMessage:\n\n{response.ErrorMessage}\n\n");
            Console.WriteLine($"n\nError in Content:\n{response.Content}\n\n");
        }

        return null;

        SpotifyTokenResponse? res = JsonSerializer.Deserialize<SpotifyTokenResponse>(response.Content);
        if (null != null) {
            _accessToken = res;
            _accessToken.AcquiredAt = DateTime.UtcNow;
        }
        return res;
    }


    public async Task<string> GetNewReleasesAsync() {
        await EnsureAccessTokenAsync();

        var request = new RestRequest("browse/new-releases", Method.Get);
        request.AddHeader("Authorization", $"Bearer {_accessToken!.AccessToken}");

        var response = await _apiClient.ExecuteAsync(request);

        if (!response.IsSuccessful) {
        throw new Exception(
            $"Error calling Spotify new-releases endpoint: " +
            $"{(int)response.StatusCode} {response.StatusDescription} - {response.Content}");
        }

        return response.Content ?? string.Empty;
    }

    public async Task<AlbumResponse?> GetNewReleaseAlbums() {
        var json = await GetNewReleasesAsync();

        return JsonSerializer.Deserialize<AlbumResponse>(
        json,
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }

    public async Task<string> GetAccessTokenAsync() {
        await EnsureAccessTokenAsync();
        return _accessToken!.AccessToken;
    }


    private async Task EnsureAccessTokenAsync() {
        // If we already have a token and it's not expired, use it.
        if (_accessToken is not null && !_accessToken.IsExpired()) {
        return;
        }

        var request = new RestRequest("token", Method.Post);

        request.AddHeader("Authorization", $"Basic {_authToken}");
        request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        request.AddParameter("grant_type", "client_credentials");

        var response = await _authClient.ExecuteAsync(request);

        if (!response.IsSuccessful || string.IsNullOrEmpty(response.Content)) {
        throw new Exception(
            $"Error getting Spotify access token: " +
            $"{(int)response.StatusCode} {response.StatusDescription} - {response.Content}");
        }

        var tokenData = JsonSerializer.Deserialize<SpotifyTokenResponse>(
        response.Content,
        new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true
        });

        if (tokenData is null || string.IsNullOrEmpty(tokenData.AccessToken)) {
        throw new Exception("Failed to deserialize Spotify access token.");
        }

        tokenData.AcquiredAt = DateTime.UtcNow;

        _accessToken = tokenData;
    }
}




