using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace Gonzalez_ChinookEndpoints.Models.Entities;
[DebuggerDisplay("InvoiceLineId = {InvoiceLineId}")]

public class InvoiceLine {
  [Key]
  public int InvoiceLineId { get; set; }

  [ForeignKey("Invoice")]
  public int InvoiceId { get; set; }
  public virtual Invoice? Invoice { get; set; }

  [ForeignKey("Track")]
  public int TrackId { get; set; }
  public virtual Track? Track { get; set; }

  [Required]
  public required decimal UnitPrice { get; set; }
  [Required]
  public required int Quantity { get; set; }
}