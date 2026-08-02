using System.ComponentModel.DataAnnotations;

namespace Gonzalez_BankApp.Models.Dtos.CustomerDtos;

public class JointCustomerInfoDto {
    
    public int CustomerId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int CreditScore { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int CustomerAge { get; set; }

    public int JointAccountId { get; set; }

    public string AccountType { get; set; } = null!;

    public decimal JointAccountBalance { get; set; }

}
