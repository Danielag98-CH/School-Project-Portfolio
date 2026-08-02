using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Invoice {
    [Key]
    public int InvoiceId { get; set; }

    public int CustomerId { get; set; }

    [ForeignKey("CustomerId")]
    public Customer ? Customer { get; set; } 

    public DateTime InvoiceDate { get; set; }

    public string ? BillingAddress { get; set; }
    public string ? BillingCity { get; set; }
    public string ? BillingState { get; set; }
    public string ? BillingCountry { get; set; }
    public string ? BillingPostalCode { get; set; }

    public decimal Total { get; set; }
}
