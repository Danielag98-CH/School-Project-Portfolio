using Gonzalez_ChinookEndpoints.Data;
using Gonzalez_ChinookEndpoints.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gonzalez_ChinookEndpoints.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class CustomerController : ControllerBase {
    private readonly ApplicationDbContext _context;

    public CustomerController(ApplicationDbContext context) {
      _context = context;
    }

    // GET: api/customer
    // Return a list of all customers with 200 OK.
    [HttpGet]
    public async Task<IActionResult> GetAllCustomer() {
      var customer = await _context.Customers.ToListAsync();
      return Ok(customer);
    }

    // GET: api/customer/{customerId}
    // Return customer by id, or 404 if not found.
    [HttpGet("{customerId:int}")]
    public async Task<IActionResult> GetCustomerById(int customerId) {
      if (customerId <= 0) {
        return BadRequest("Customer ID must be a positive integer.");
      }

      var customer = await _context.Customers.FindAsync(customerId);

      if (customer == null) {
        return NotFound($"No customer with ID {customerId} can be found.");
      }

      return Ok(customer);
    }

    // DELETE: api/customer/{customerId}
    // Delete customer if exists. 204 if deleted, 404 if not found.
    [HttpDelete("{customerId:int}")]
    public async Task<IActionResult> DeleteCustomer(int customerId) {
      if (customerId <= 0) {
        return BadRequest("Customer ID must be a positive integer.");
      }

      var customer = await _context.Customers.FindAsync(customerId);

      if (customer == null) {
        return NotFound($"No customer with ID {customerId} can be found.");
      }

      _context.Customers.Remove(customer);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
