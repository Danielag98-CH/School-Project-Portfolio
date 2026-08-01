using System.Text.Json.Serialization;
public class Benefit {
    [JsonPropertyName("id")]
    public string Id { get; set; }
    [JsonPropertyName("additional")]
    public decimal Additional { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
}