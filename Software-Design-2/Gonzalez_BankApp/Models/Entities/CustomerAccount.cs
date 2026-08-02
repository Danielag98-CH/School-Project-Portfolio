using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_BankApp.Models.Entities;

public class CustomerAccount {

    public int CustId { get; set; }

    public int AccountId { get; set; }

    public Customer Customer { get; set; } = null!;

    public Account Account { get; set; } = null!;
  
}
