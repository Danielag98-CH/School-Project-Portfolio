using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class EmployeeTerritory {
  public int EmployeeId { get; set; }
  [ForeignKey("EmployeeId")]
  public Employee? Employee { get; set; }

  public string? TerritoryId { get; set; }
  [ForeignKey("TerritoryId")]
  public Territory? Territory { get; set; }
}