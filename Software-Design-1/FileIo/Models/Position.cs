using System.Text.Json.Serialization;
public class Position {
    [JsonPropertyName("id")]
    public string Id { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
}