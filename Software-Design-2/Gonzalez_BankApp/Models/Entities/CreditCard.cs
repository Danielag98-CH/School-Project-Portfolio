using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gonzalez_BankApp.Models.Entities;

public class CreditCard {
    public int CardId { get; set; }

    public string CardNumber { get; set; } = null!;

    public string CardType { get; set; } = null!;

    public DateTime ExpDate { get; set; }

    public decimal AvailCredit { get; set; }

    public decimal CreditLimit { get; set; }

    public ICollection<CustomerCreditCard> CustomerCreditCards { get; set; } = new List<CustomerCreditCard>();
  
}
