using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Collections;
using System.ComponentModel.DataAnnotations.Schema;
using Gonzalez_ChinookMusicApp.Models.Entities;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Customer {

    [Key]
    public int CustomerId { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public string? Company { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public string? PostalCode { get; set; }

    public string? Phone { get; set; }

    public string? Fax { get; set; }

    public string? Email { get; set; }

    [ForeignKey("Employee")]
    public int SupportRepId { get; set; }

    [ForeignKey("SupportRepId")]
    public Employee SupportRep { get; set; } = null!;
}
