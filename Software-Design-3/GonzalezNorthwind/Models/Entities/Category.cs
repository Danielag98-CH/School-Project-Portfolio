using System.ComponentModel.DataAnnotations;

namespace GonzalezNorthwind.Models.Entities;

public class Category {
  [Key]
  public int CategoryId { get; set; }

  public string? CategoryName { get; set; }
  public string? Description { get; set; }
  public byte[]? Picture { get; set; }

  public ICollection<Product> Products { get; set; } = new List<Product>();
}