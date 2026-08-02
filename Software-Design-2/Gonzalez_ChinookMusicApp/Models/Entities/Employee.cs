

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Employee {

    [Key]
    public int EmployeeId { get; set; }

    public required string LastName { get; set; }

    public required string FirstName { get; set; }

    public string? Title { get; set; }

    public int? ReportsTo { get; set; }

    [ForeignKey("ReportsTo")]
    public Employee? ReportsToManager { get; set; }

    public DateTime BirthDate { get; set; }

    public DateTime HireDate { get; set; }

    public required string Address { get; set; }

    public required string City { get; set; }

    public required string State { get; set; }

    public required string Country { get; set; }

    public required string PostalCode { get; set; }

    public required string Phone { get; set; }

    public required string Fax { get; set; }
    
    public required string Email { get; set; }
}