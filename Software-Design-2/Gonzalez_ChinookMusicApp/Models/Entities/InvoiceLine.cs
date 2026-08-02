using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class InvoiceLine {
    [Key]
    public int InvoiceLineId { get; set; }

    public int InvoiceId { get; set; }

    [ForeignKey("InvoiceId")]
    public Invoice Invoice { get; set; } = null!;

    public int TrackId { get; set; }

    [ForeignKey("TrackId")]
    public Track ? Track { get; set; } 

    public decimal UnitPrice { get; set; }

    public int Quantity { get; set; }
}
