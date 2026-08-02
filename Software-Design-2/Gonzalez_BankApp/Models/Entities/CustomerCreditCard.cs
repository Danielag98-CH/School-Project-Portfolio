using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_BankApp.Models.Entities;

public class CustomerCreditCard {
    public int CustId { get; set; }

    public int CardId { get; set; }

    public Customer Customer { get; set; } = null!;

    public CreditCard CreditCard { get; set; } = null!;
  
}
