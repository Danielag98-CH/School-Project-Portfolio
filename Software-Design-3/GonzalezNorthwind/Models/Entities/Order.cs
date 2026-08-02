using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class Order {
  [Key]
  public int OrderId { get; set; }

  public string? CustomerId { get; set; }
  [ForeignKey("CustomerId")]
  public Customer? Customer { get; set; }

  public int? EmployeeId { get; set; }
  [ForeignKey("EmployeeId")]
  public Employee? Employee { get; set; }

  public DateTime? OrderDate { get; set; }
  public DateTime? RequiredDate { get; set; }
  public DateTime? ShippedDate { get; set; }

  public int? ShipVia { get; set; }
  [ForeignKey("ShipVia")]
  public Shipper? Shipper { get; set; }

  public decimal? Freight { get; set; }
  public string? ShipName { get; set; }
  public string? ShipAddress { get; set; }
  public string? ShipCity { get; set; }
  public string? ShipRegion { get; set; }
  public string? ShipPostalCode { get; set; }
  public string? ShipCountry { get; set; }

  public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}