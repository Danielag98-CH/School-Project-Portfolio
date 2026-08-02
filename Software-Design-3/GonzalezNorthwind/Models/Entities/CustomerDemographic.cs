using System.ComponentModel.DataAnnotations;

namespace GonzalezNorthwind.Models.Entities;

public class CustomerDemographic {
  [Key]
  public string? CustomerTypeId { get; set; }
  
  public string? CustomerDesc { get; set; }

  public ICollection<CustomerCustomerDemo> CustomerCustomerDemos { get; set; } = new List<CustomerCustomerDemo>();
}