using Microsoft.EntityFrameworkCore;
using GonzalezNorthwind.Data;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services.Mapping;

namespace GonzalezNorthwind.Services;

public class CustomerService {
  private readonly ApplicationDbContext _context;
  private readonly CustomerMappingService _mappingService;

  public CustomerService(ApplicationDbContext context, CustomerMappingService mappingService) {
    _context = context;
    _mappingService = mappingService;
  }

  // GET All Customers By Country (GET api/customers/by-country)
  public async Task<Dictionary<string, List<CustomerDto>>> GetCustomersByCountryAsync() {
    // Get All Customers
    var customers = await _context.Customers.ToListAsync();
    // Group All Customers By Country
    var groupedCustomers = customers
      .GroupBy(c => string.IsNullOrWhiteSpace(c.Country) ? "No Country Listed" : c.Country)
      .ToDictionary(
        g => g.Key,
        g => g.OrderBy(c => c.CompanyName)
              .Select(c => _mappingService.MapToCustomerDto(c))
              .ToList()
      );

    return groupedCustomers;
  }

  // GET Customers With No Orders (GET api/customers/no-orders)
  public async Task<List<CustomerDto>> GetCustomersWithNoOrdersAsync() {
    // Get All Customers With No Orders
    var customersWithNoOrders = await _context.Customers
      .Where(c => !c.Orders.Any())
      .ToListAsync();

    return _mappingService.MapToCustomerDtoList(customersWithNoOrders);
  }

  // GET Customer Order Summary (GET api/customers/{customerId}/order-summary)
  public async Task<CustomerOrderSummaryDto?> GetCustomerOrderSummaryAsync(string customerId) {
    // Get Customer By ID - Include Orders and OrderDetails
    var customer = await _context.Customers
      .Include(c => c.Orders)
        .ThenInclude(o => o.OrderDetails)
      .FirstOrDefaultAsync(c => c.CustomerId == customerId);

    // Return NULL if customer is not found
    if (customer == null) {
      return null;
    }

    // Return an empty CustomerOrderSummaryDto if customer has no orders
    if (!customer.Orders.Any()) {
      return new CustomerOrderSummaryDto {
        CustomerId = customer.CustomerId,
        ContactName = customer.ContactName,
        TotalOrders = 0,
        FirstOrderDate = null,
        MostRecentOrderDate = null,
        TotalAmountSpent = 0
      };
    }

    // Get sum of total amount spent from customer
    var totalAmount = customer.Orders
      .SelectMany(o => o.OrderDetails)
      .Sum(od => (decimal)od.UnitPrice * od.Quantity * (decimal)(1 - od.Discount));


    // Return completed CustomerOrderSummaryDto
    return new CustomerOrderSummaryDto {
      CustomerId = customer.CustomerId,
      ContactName = customer.ContactName,
      TotalOrders = customer.Orders.Count,
      FirstOrderDate = customer.Orders.Min(o => o.OrderDate),
      MostRecentOrderDate = customer.Orders.Max(o => o.OrderDate),
      TotalAmountSpent = totalAmount
    };
  }
}
