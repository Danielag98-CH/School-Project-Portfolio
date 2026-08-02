using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Gonzalez_ChinookEndpoints.Data;

namespace Gonzalez_ChinookEndpoints.Controllers {
	[Route("api/[controller]")]
	[ApiController]

	public class InvoiceController : ControllerBase {
		private readonly ApplicationDbContext _context;

		public InvoiceController(ApplicationDbContext context) {
			_context = context;
		}

		// Get All Invoice (GET api/invoices)
		[HttpGet("")]
		public async Task<ActionResult> GetAllInvoice() {
			var invoice = await _context.Invoices
				.ToListAsync();

			return Ok(invoice);
		}

		// Get Invoice by ID (GET api/invoices/{invoiceId})
		[HttpGet("{invoiceId}")]
		public async Task<ActionResult> GetInvoiceById(int? invoiceId) {
			var invoice = await _context.Invoices
				.SingleOrDefaultAsync(i => i.InvoiceId == invoiceId);

			if (invoice == null) {
				return NotFound($"No invoice found with ID: {invoiceId}");
			}

			return Ok(invoice);
		}

		// Get Invoice Stats (GET api/invoices/stats)
		[HttpGet("stats")]
		public async Task<ActionResult> GetInvoiceStats(int? topNumExpensiveInvoices) {
			if (topNumExpensiveInvoices == null) {
				return BadRequest("The parameter 'topNumExpensiveInvoices' is required.");
			}
			else if (topNumExpensiveInvoices <= 0) {
				return BadRequest("The parameter 'topNumExpensiveInvoices' must be a positive integer.");
			}

			var stats = await _context.Invoices
				.GroupBy(i => i.BillingState ?? "No Billing State")
				.Select(g => new {
					BillingState = g.Key,
                    TopInvoices = g.OrderByDescending(i => (int)i.Total)
						.Take(topNumExpensiveInvoices.Value)
						.ToList()
				})
				.ToDictionaryAsync(g => g.BillingState, g => g.TopInvoices);

			return Ok(stats);
		}

		// Delete Invoice by ID (DELETE api/invoices/{invoiceId})
		[HttpDelete("{invoiceId}")]
		public async Task<ActionResult> DeleteInvoice(int? invoiceId) {
			var invoice = await _context.Invoices
				.SingleOrDefaultAsync(i => i.InvoiceId == invoiceId);

			if (invoice == null) {
				return NotFound($"No invoice found with ID: {invoiceId}");
			}

			_context.Invoices.Remove(invoice);

			await _context.SaveChangesAsync();

			return NoContent();
		}
    }
}