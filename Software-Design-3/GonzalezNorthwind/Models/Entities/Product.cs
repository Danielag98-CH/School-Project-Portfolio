using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class Product {
  [Key]
  public int ProductId { get; set; }

  public string? ProductName { get; set; }

  public int? SupplierId { get; set; }
  [ForeignKey("SupplierId")]
  public Supplier? Supplier { get; set; }
  
  public int? CategoryId { get; set; }
  [ForeignKey("CategoryId")]
  public Category? Category { get; set; }

  public string? QuantityPerUnit { get; set; }
  public decimal? UnitPrice { get; set; }
  public short? UnitsInStock { get; set; }
  public short? UnitsOnOrder { get; set; }
  public short? ReorderLevel { get; set; }
  public bool Discontinued { get; set; }

  public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}