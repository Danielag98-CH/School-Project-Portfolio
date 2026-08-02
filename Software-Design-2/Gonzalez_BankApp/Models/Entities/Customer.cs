using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_BankApp.Models.Entities;

public class Customer {

    public int CustId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime DOB { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public DateTime DateJoined { get; set; }

    public int CreditScore { get; set; }
    
    public ICollection<CustomerAccount> CustomerAccounts { get; set; } = new List<CustomerAccount>();

    public ICollection<CustomerCreditCard> CustomerCreditCards { get; set; } = new List<CustomerCreditCard>();
    
}