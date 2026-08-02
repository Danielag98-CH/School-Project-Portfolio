using System.ComponentModel.DataAnnotations.Schema;

namespace GonzalezNorthwind.Models.Entities;

public class CustomerCustomerDemo {
  public string? CustomerId { get; set; }
  [ForeignKey("CustomerId")]
  public Customer? Customer { get; set; }

  public string? CustomerTypeId { get; set; }
  [ForeignKey("CustomerTypeId")]
  public CustomerDemographic? CustomerDemographic { get; set; }
}