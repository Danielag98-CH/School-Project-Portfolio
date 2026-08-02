namespace GonzalezNorthwind.Models.Dtos;

public class CustomerDto {
  public string? CustomerId { get; set; }
  public string? CompanyName { get; set; }
  public string? ContactName { get; set; }
  public string? ContactTitle { get; set; }
  public string? Address { get; set; }
  public string? City { get; set; }
  public string? Region { get; set; }
  public string? PostalCode { get; set; }
  public string? Country { get; set; }
  public string? Phone { get; set; }
  public string? Fax { get; set; }
}

public class CustomerOrderSummaryDto {
  public string? CustomerId { get; set; }
  public string? ContactName { get; set; }
  public int TotalOrders { get; set; }
  public DateTime? FirstOrderDate { get; set; }
  public DateTime? MostRecentOrderDate { get; set; }
  public decimal TotalAmountSpent { get; set; }
}
