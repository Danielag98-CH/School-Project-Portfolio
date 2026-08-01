using System.Text.Json.Serialization;
public class Cofounder {
    [JsonPropertyName("id")]
    public string Id { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; }
}