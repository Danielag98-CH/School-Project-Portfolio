using System.ComponentModel.DataAnnotations;

namespace Gonzalez_BankApp.Models.Dtos.CustomerDtos;

public class CreditScoreBracket {
    public string Name { get; set; } = null!;

    public int Bracket { get; set; }

}