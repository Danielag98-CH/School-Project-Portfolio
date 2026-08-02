using System.ComponentModel.DataAnnotations;

namespace GonzalezNorthwind.Models.Entities;

public class Region {
  [Key]
  public int RegionId { get; set; }

  public string? RegionDescription { get; set; }

  public ICollection<Territory> Territories { get; set; } = new List<Territory>();
}