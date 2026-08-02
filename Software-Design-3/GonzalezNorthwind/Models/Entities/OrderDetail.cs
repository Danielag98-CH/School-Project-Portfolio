using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class OrderDetail {
  public int OrderId { get; set; }
  [ForeignKey("OrderId")]
  public Order? Order { get; set; }
  
  public int ProductId { get; set; }
  [ForeignKey("ProductId")]
  public Product? Product { get; set; }

  public decimal UnitPrice { get; set; }
  public short Quantity { get; set; }
  public float Discount { get; set; }
}