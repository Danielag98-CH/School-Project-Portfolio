using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class Territory {
  [Key]
  public string? TerritoryId { get; set; }

  public string? TerritoryDescription { get; set; }

  public int RegionId { get; set; }
  [ForeignKey("RegionId")]
  public Region? Region { get; set; }
  
  public ICollection<EmployeeTerritory> EmployeeTerritories { get; set; } = new List<EmployeeTerritory>();
}