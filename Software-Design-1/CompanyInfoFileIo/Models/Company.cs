using System.Text.Json.Serialization;

public class Company {
    [JsonPropertyName("id")]
    public string Id { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("cofounders")]
    public List<Cofounder> Cofounders { get; set; } = new List<Cofounder>();
    [JsonPropertyName("employees")]
    public List<Employee> Employees { get; set; } = new List<Employee>();
}