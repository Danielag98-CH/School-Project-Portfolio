using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;




namespace Gonzalez_ChinookCrudApp.Models.Entities;

public class Employee {

    [Key]
    public int EmployeeId { get; set; }

    [Required]
    public string ? LastName { get; set; }

    [Required]
    public string ? FirstName { get; set; }

    public string ? Title { get; set; }

    public int ? ReportsTo { get; set; }

    [ForeignKey("ReportsTo")]
    public Employee? ReportsToManager { get; set; }

    public DateTime BirthDate { get; set; }

    public DateTime HireDate { get; set; }

    [Required]
    public string ? Address { get; set; }

    [Required]
    public string ? City { get; set; }

    [Required]
    public string ? State { get; set; }

    [Required]
    public string ? Country { get; set; }

    [Required]
    public string ? PostalCode { get; set; }

    [Required]
    public string ? Phone { get; set; }

    [Required]
    public string ? Fax { get; set; }
    
    [Required]
    public string ? Email { get; set; }
}