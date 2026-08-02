using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_BankApp.Models.Entities;

public class Account{
    
  public int AccountId { get; set; }

  public string Type { get; set; } = null!;

  public DateTime DateCreated { get; set; }

  public decimal Balance { get; set; }


  public ICollection<CustomerAccount> CustomerAccounts { get; set; } = new List<CustomerAccount>(); 
}