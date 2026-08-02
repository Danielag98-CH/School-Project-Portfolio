using System.ComponentModel.DataAnnotations;

namespace Gonzalez_BankApp.Models.Dtos.CustomerDtos;

public class CustomerSummaryDto {
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int CreditScore { get; set; }

    public int NumAccounts { get; set; }

    public int NumCreditCards { get; set; }
}