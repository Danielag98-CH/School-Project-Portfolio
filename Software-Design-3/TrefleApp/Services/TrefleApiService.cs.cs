using System.Text.Json;
using RestSharp;
using TrefleApp.Models.Trefle.Responses;

namespace TrefleApp.Services;

/**
    Responsible strictly for talking with the Trefle API.
*/
public class TrefleApiService {
    private readonly RestClient _restClient;
    private readonly string? _apiKey;
    private readonly string? _baseUrl;

    public TrefleApiService(IConfiguration config) {
        _apiKey = config["Trefle:ApiKey"];
        _baseUrl = config["Trefle:BaseUrl"] ?? "";
        _restClient = new RestClient(_baseUrl);

    }

    public async Task<PlantResponse?> GetPlantById(int plantId) {
        // TODO: Complete.
        return null;
    }

    public async Task<PlantListResponse?> GetPlants() {
        var request = new RestRequest($"/plants?token={_apiKey}")
            .AddHeader("accept", "application/json");

        Console.WriteLine($"\n{request}\n");

        var response = await _restClient.GetAsync(request);

        return JsonSerializer.Deserialize<PlantListResponse>(response.Content);
    }

}