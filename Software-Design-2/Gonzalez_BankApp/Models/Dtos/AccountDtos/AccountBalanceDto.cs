using System.ComponentModel.DataAnnotations;

namespace Gonzalez_BankApp.Models.Dtos.AccountDtos;

public class AccountBalanceDto {
    public string AccountType { get; set; } = null!;
    
    public decimal TotalBalance { get; set; }


}

