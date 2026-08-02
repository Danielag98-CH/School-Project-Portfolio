using Microsoft.AspNetCore.Mvc;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services;

namespace GonzalezNorthwind.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase {
  private readonly CustomerService _customerService;

  public CustomersController(CustomerService customerService) {
    _customerService = customerService;
  }

  // GET All Customers By Country (GET api/customers/by-country)
  [HttpGet("by-country")]
  public async Task<ActionResult<Dictionary<string, List<CustomerDto>>>> GetCustomersByCountryAsync() {
    var result = await _customerService.GetCustomersByCountryAsync();
    return Ok(result);
  }

  // GET Customers With No Orders (GET api/customers/no-orders)
  [HttpGet("no-orders")]
  public async Task<ActionResult<List<CustomerDto>>> GetCustomersWithNoOrdersAsync() {
    var result = await _customerService.GetCustomersWithNoOrdersAsync();
    return Ok(result);
  }

  // GET Customer Order Summary (GET api/customers/{customerId}/order-summary)
  [HttpGet("{customerId}/order-summary")]
  public async Task<ActionResult<CustomerOrderSummaryDto>> GetCustomerOrderSummaryAsync(string customerId) {
    if (string.IsNullOrWhiteSpace(customerId)) {
      return BadRequest("Customer ID is required.");
    }

    var result = await _customerService.GetCustomerOrderSummaryAsync(customerId);

    if (result == null) {
      return NotFound($"Customer with ID '{customerId}' not found.");
    }

    return Ok(result);
  }
}